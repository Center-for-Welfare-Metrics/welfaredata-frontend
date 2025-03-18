interface Size {
  w: number;
  h: number;
}

function getRotationTransform(element: SVGElement) {
  const transformAttr = element.getAttribute("transform");
  if (!transformAttr) return { angle: 0, cx: 0, cy: 0 };

  // Match "rotate(angle cx cy)" format
  const match = transformAttr.match(
    /rotate\((-?\d+(?:\.\d+)?)(?:\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?))?\)/
  );

  if (!match) return { angle: 0, cx: 0, cy: 0 };

  const angle = parseFloat(match[1]); // Rotation angle
  const cx = match[2] ? parseFloat(match[2]) : 0; // Center X (optional)
  const cy = match[3] ? parseFloat(match[3]) : 0; // Center Y (optional)

  return { angle, cx, cy };
}

function getTransformedBBox(element: SVGGraphicsElement) {
  const bbox = element.getBBox();
  const { angle, cx, cy } = getRotationTransform(element);

  if (angle === 0) return bbox; // No rotation, return normal bbox

  const radians = (angle * Math.PI) / 180; // Convert degrees to radians

  // Four original corners of the bbox
  const corners = [
    { x: bbox.x, y: bbox.y }, // Top-left
    { x: bbox.x + bbox.width, y: bbox.y }, // Top-right
    { x: bbox.x, y: bbox.y + bbox.height }, // Bottom-left
    { x: bbox.x + bbox.width, y: bbox.y + bbox.height }, // Bottom-right
  ];

  // Rotate each corner around (cx, cy)
  const rotatedCorners = corners.map(({ x, y }) => {
    const dx = x - cx;
    const dy = y - cy;
    return {
      x: cx + dx * Math.cos(radians) - dy * Math.sin(radians),
      y: cy + dx * Math.sin(radians) + dy * Math.cos(radians),
    };
  });

  // Compute new bbox from rotated corners
  const xValues = rotatedCorners.map((p) => p.x);
  const yValues = rotatedCorners.map((p) => p.y);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin,
  };
}

const getScale = (
  relativeSize: number,
  minScale: number = 4,
  factor: number = 10
): number => {
  // Ensure the relative size is not zero or negative
  if (relativeSize <= 0) {
    throw new Error("Relative size must be positive.");
  }

  // Calculate the scale using an inverse relationship
  const scale = minScale + (1 / relativeSize) * factor;

  // Ensure the scale is never below the minimum value
  return Math.max(scale, minScale);
};

const getRelativeSize = (first: Size, second: Size): number => {
  // Calculate the area of the first element
  const area1 = first.w * first.h;

  // Calculate the area of the second element
  const area2 = second.w * second.h;

  // Calculate the relative size as a percentage
  const relativeSize = (area2 / area1) * 100;

  return relativeSize;
};

/**
 * Process an SVG object into an image element
 */
export const processSvgToImage = async (
  svgElement: SVGElement
): Promise<SVGElement | SVGGraphicsElement> => {
  // Get the dimensions from the SVG viewBox or attributes
  let width = svgElement.clientWidth;
  let height = svgElement.clientHeight;

  // Try to get more accurate dimensions
  const viewBox = svgElement.getAttribute("viewBox");
  if (viewBox) {
    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
    if (!isNaN(vbWidth) && !isNaN(vbHeight)) {
      width = vbWidth;
      height = vbHeight;
    }
  }

  // If dimensions are still not available, try width/height attributes
  if (!width || !height) {
    const svgWidth = svgElement.getAttribute("width");
    const svgHeight = svgElement.getAttribute("height");

    if (svgWidth) width = parseFloat(svgWidth);
    if (svgHeight) height = parseFloat(svgHeight);
  }

  // Ensure we have valid dimensions
  if (!width || !height || width <= 0 || height <= 0) {
    console.warn("Could not determine SVG dimensions, using defaults");
    width = width || 100;
    height = height || 100;
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);

  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise<SVGElement | SVGGraphicsElement>((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.imageSmoothingEnabled = false;
      }

      // Set canvas dimensions to match the SVG's intended size
      canvas.width = width * 2;
      canvas.height = height * 2;

      // Draw the image with specific dimensions to ensure proper scaling
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );

      const dataUrl = canvas.toDataURL("image/png", 1.0);

      imgElement.setAttribute("x", "0");
      imgElement.setAttribute("y", "0");
      imgElement.setAttribute("width", width.toString());
      imgElement.setAttribute("height", height.toString());
      imgElement.setAttribute("href", dataUrl);

      const gClone = svgElement.cloneNode(false) as SVGGraphicsElement;
      gClone.setAttribute("data-optimized", "true");
      gClone.appendChild(imgElement);

      resolve(gClone);
    };

    // Handle errors in image loading
    img.onerror = () => {
      URL.revokeObjectURL(url);
      console.error(`Failed to load image for group ${svgElement.id}`);
      resolve(svgElement); // Resolve anyway to avoid blocking other operations
    };

    img.src = url;
  });
};

/**
 * Processes an SVG group element into an image element
 */
const processGroupToImage = async (
  group: SVGGraphicsElement,
  svgElement: SVGElement,
  originalItemsMap: Map<string, SVGGraphicsElement>,
  optimizedMap: Map<string, SVGElement>
): Promise<void> => {
  const bbox = group.getBBox();
  if (bbox.width === 0 || bbox.height === 0) return;

  // Get the transformed bounding box of the group, some elements might be rotated
  const { width, height, x, y } = getTransformedBBox(group);

  // Clone the element to preserve the original structure
  const clonedGroup = group.cloneNode(true) as SVGGraphicsElement;
  originalItemsMap.set(group.id, clonedGroup);

  // Serialize the updated <g> with styles
  const serializer = new XMLSerializer();
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}">${serializer.serializeToString(
    clonedGroup
  )}</svg>`;

  const relativeSize = getRelativeSize(
    { w: svgElement.clientWidth, h: svgElement.clientHeight },
    { w: width, h: height }
  );

  const scale = getScale(relativeSize, 3, 1);

  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise<void>((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.imageSmoothingEnabled = false;
      }

      canvas.width = width * scale;
      canvas.height = height * scale;

      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );

      const dataUrl = canvas.toDataURL("image/png", 1.0);

      imgElement.setAttribute("x", x.toString());
      imgElement.setAttribute("y", y.toString());
      imgElement.setAttribute("width", width.toString());
      imgElement.setAttribute("height", height.toString());
      imgElement.setAttribute("href", dataUrl);

      if (group.tagName === "path") {
        const gElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        gElement.setAttribute("id", group.id);
        gElement.appendChild(imgElement);
        gElement.setAttribute("data-optimized", "true");
        optimizedMap.set(group.id, gElement);
      } else {
        const gClone = group.cloneNode(false) as SVGGraphicsElement;
        gClone.setAttribute("data-optimized", "true");
        gClone.appendChild(imgElement);
        optimizedMap.set(group.id, gClone);
      }

      resolve();
    };

    // Handle errors in image loading
    img.onerror = () => {
      URL.revokeObjectURL(url);
      console.error(`Failed to load image for group ${group.id}`);
      resolve(); // Resolve anyway to avoid blocking other operations
    };

    img.src = url;
  });
};

/**
 * Base function for SVG optimization
 */
const optimizeSvgBase = async (
  svgElement: SVGElement,
  selector: string,
  optimizedMap: Map<string, SVGElement>
): Promise<{ originalItemsMap: Map<string, SVGGraphicsElement> }> => {
  if (!svgElement) return { originalItemsMap: new Map() };

  const originalItemsMap = new Map<string, SVGGraphicsElement>();
  const groups = Array.from(
    svgElement.querySelectorAll(selector)
  ) as SVGGraphicsElement[];

  const processingPromises: Promise<void>[] = [];

  for (const group of groups) {
    if (group.getAttribute("data-optimized") === "true") continue;

    const groupId = group.id;

    if (groupId && optimizedMap.has(groupId)) {
      const optimizedGroup = optimizedMap.get(groupId);
      if (optimizedGroup) {
        group.replaceWith(optimizedGroup);
        continue;
      }
    }

    const processPromise = processGroupToImage(
      group,
      svgElement,
      originalItemsMap,
      optimizedMap
    );

    processingPromises.push(processPromise);
  }

  // Wait for all images to be processed
  await Promise.all(processingPromises);

  return { originalItemsMap };
};

export const optimizeSvg = async (
  svgElement: SVGElement,
  selector: string,
  optimizedMap: Map<string, SVGElement>
): Promise<{ originalItemsMap: Map<string, SVGGraphicsElement> }> => {
  return optimizeSvgBase(svgElement, selector, optimizedMap);
};

export const optimizeItself = async (
  svgElement: SVGElement,
  selector: string,
  optimizedMap: Map<string, SVGElement>
): Promise<{ originalItemsMap: Map<string, SVGGraphicsElement> }> => {
  return optimizeSvgBase(svgElement, selector, optimizedMap);
};

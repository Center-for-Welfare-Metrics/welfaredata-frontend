interface Size {
  w: number;
  h: number;
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

export const optimizeSvg = (
  svgElement: SVGElement,
  selector: string,
  optimizedMap: Map<string, SVGElement>
) => {
  if (!svgElement) return;

  const originalItemsMap = new Map<string, SVGGraphicsElement>();

  const groups = Array.from(
    svgElement.querySelectorAll(selector)
  ) as SVGGraphicsElement[];

  for (const group of groups) {
    if (group.getAttribute("data-optimized") === "true") continue;

    const groupId = group.id;

    if (groupId) {
      if (optimizedMap.has(groupId)) {
        const optimizedGroup = optimizedMap.get(groupId);
        if (optimizedGroup) {
          group.replaceWith(optimizedGroup);
          continue;
        }
      }
    }

    const bbox = group.getBBox();
    if (bbox.width === 0 || bbox.height === 0) continue;

    // Clone the element to preserve the original structure
    const clonedGroup = group.cloneNode(true) as SVGGraphicsElement;
    originalItemsMap.set(group.id, clonedGroup);
    // Inline all styles to the cloned <g>
    inlineStyles(clonedGroup);

    // Serialize the updated <g> with styles
    const serializer = new XMLSerializer();
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${
      bbox.x
    } ${bbox.y} ${bbox.width} ${bbox.height}">${serializer.serializeToString(
      clonedGroup
    )}</svg>`;

    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.imageSmoothingEnabled = false;
      }

      const relativeSize = getRelativeSize(
        { w: svgElement.clientWidth, h: svgElement.clientHeight },
        { w: bbox.width, h: bbox.height }
      );

      const scale = getScale(relativeSize, 2, 0.5);

      canvas.width = bbox.width * scale;
      canvas.height = bbox.height * scale;

      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
      );

      const dataUrl = canvas.toDataURL("image/png", 1.0);

      imgElement.setAttribute("x", bbox.x.toString());
      imgElement.setAttribute("y", bbox.y.toString());
      imgElement.setAttribute("width", bbox.width.toString());
      imgElement.setAttribute("height", bbox.height.toString());
      imgElement.setAttribute("href", dataUrl);

      if (group.tagName === "path") {
        const gElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        gElement.setAttribute("id", group.id);
        gElement.appendChild(imgElement);
        gElement.setAttribute("data-optimized", "true");
        group.replaceWith(gElement);
        optimizedMap.set(group.id, gElement);
      } else {
        while (group.firstChild) {
          group.removeChild(group.firstChild);
        }
        group.setAttribute("data-optimized", "true");
        group.appendChild(imgElement);
        optimizedMap.set(group.id, group);
      }
    };

    img.src = url;
  }

  return { originalItemsMap };
};

const inlineStyles = (element: Element) => {
  const computedStyle = window.getComputedStyle(element);
  for (const prop of Array.from(computedStyle)) {
    element.setAttribute(prop, computedStyle.getPropertyValue(prop));
  }
  Array.from(element.children).forEach(inlineStyles);
};

type Params = {
  x: number;
  y: number;
  width: number;
  height: number;
  dataUrl: string;
  group: SVGGraphicsElement;
  canvas?: HTMLCanvasElement;
};

export const generateRasterSvgElement = ({
  x,
  y,
  width,
  height,
  dataUrl,
  group,
}: Params): SVGGraphicsElement => {
  const imgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );

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
    return gElement;
  } else {
    const gClone = group.cloneNode(false) as SVGGraphicsElement;
    gClone.setAttribute("data-optimized", "true");
    gClone.appendChild(imgElement);
    return gClone;
  }
};

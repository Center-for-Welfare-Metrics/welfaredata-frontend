import { LEVELS_DICT } from "./consts";

export const getLevelById = (id: string) => {
  return LEVELS_DICT["--" + id.split("--")[1].split("-")[0]];
};

export const simplifySvg = (svgElement: SVGElement, selector: string) => {
  if (!svgElement) return;

  const paths = Array.from(svgElement.querySelectorAll("path"));

  paths.forEach((path) => {
    const originalD = path.getAttribute("d");
    if (!originalD) return;

    // Use a simple path-simplification algorithm
    const simplifiedD = simplifyPath(originalD, 2); // Reduce details by 2%
    path.setAttribute("d", simplifiedD);
  });
};

const simplifyPath = (d: string, tolerance: number): string => {
  // Very basic simplification (reduces decimal places and removes tiny movements)
  return d
    .replace(/\d+\.\d+/g, (num) => parseFloat(num).toFixed(tolerance)) // Reduce decimal precision
    .replace(/([LMC])(\s*\d+\s*\d+)/g, "$1 $2") // Normalize spacing
    .replace(/\s{2,}/g, " ") // Remove extra spaces
    .trim();
};

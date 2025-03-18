import { useCallback, useEffect, useRef } from "react";
import { useOptimizeSvgParts } from "../../useOptimizeSvgParts";

type Props = {
  svgElement: SVGElement | null;
  updateSvgElement: (svgElement: SVGElement) => void;
  open?: boolean;
};

export const useBeforeStart = ({
  svgElement,
  updateSvgElement,
  open,
}: Props) => {
  const isOriginal = useRef<boolean>(true);

  const { restoreRootElement, optimizeRootElement } =
    useOptimizeSvgParts(svgElement);

  const optimize = useCallback(async () => {
    if (!isOriginal.current) return;
    const newRootElement = await optimizeRootElement();
    svgElement.replaceWith(newRootElement);
    updateSvgElement(newRootElement);
    isOriginal.current = false;
  }, [svgElement, optimizeRootElement]);

  const restore = useCallback(async () => {
    if (isOriginal.current) return;
    const newRootElement = await restoreRootElement();
    svgElement.replaceWith(newRootElement);
    updateSvgElement(newRootElement);
    isOriginal.current = true;
  }, [svgElement, restoreRootElement]);

  return { optimize, restore };
};

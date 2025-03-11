import { useCallback, useEffect, useRef, useState } from "react";
import { optimizeSvg } from "./utils";

export const useOptimizeSvgParts = () => {
  const originalGElements = useRef<Map<string, SVGElement>>(new Map());
  const optimizedGElements = useRef<Map<string, SVGElement>>(new Map());

  const replaceWithOptimized = useCallback(
    (svgElement: SVGElement | null, selector: string) => {
      if (!svgElement) return;

      const { originalItemsMap } = optimizeSvg(
        svgElement,
        selector,
        optimizedGElements.current
      );

      originalItemsMap.forEach((value, key) => {
        originalGElements.current.set(key, value);
      });
    },
    []
  );

  const restoreOriginal = useCallback(
    (
      svgElement: SVGElement | null,
      selector: string,
      bruteOptimization = false
    ) => {
      if (!svgElement) return;

      const gElements = Array.from(svgElement.querySelectorAll(selector));

      for (const gElement of gElements) {
        const id = gElement.id;
        if (!id || !originalGElements.current.has(id)) continue;

        const originalG = originalGElements.current.get(id);
        if (bruteOptimization) {
          if (originalG.tagName === "g") continue;
        }
        gElement.replaceWith(originalG);
      }
    },
    []
  );

  return { replaceWithOptimized, restoreOriginal };
};

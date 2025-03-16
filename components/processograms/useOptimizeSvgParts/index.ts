import { useCallback, useRef } from "react";
import { optimizeSvg } from "./utils";
import { INVERSE_DICT, MAX_LEVEL } from "../NewProcessogram/consts";
import { getLevelById } from "../NewProcessogram/utils";

export const useOptimizeSvgParts = () => {
  const originalGElements = useRef<Map<string, SVGElement>>(new Map());
  const optimizedGElements = useRef<Map<string, SVGElement>>(new Map());

  const replaceWithOptimized = useCallback(
    (svgElement: SVGElement | null, selector: string) => {
      if (!svgElement) return;

      const gElements = Array.from(svgElement.querySelectorAll(selector));

      for (const gElement of gElements) {
        const id = gElement.id;
        if (!id) continue;

        if (gElement.getAttribute("data-optimized")) continue;

        if (optimizedGElements.current.has(id)) {
          const optimizedG = optimizedGElements.current.get(id);
          if (optimizedG) {
            gElement.replaceWith(optimizedG);
          }
        }
      }
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
        if (!gElement.getAttribute("data-optimized")) continue;

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

  const optimizeAllElements = useCallback(
    async (svgElement: SVGElement | null) => {
      if (!svgElement) return;

      const dashedElementSelector = '[id*="--"]';

      const { originalItemsMap } = await optimizeSvg(
        svgElement,
        dashedElementSelector,
        optimizedGElements.current
      );

      originalItemsMap.forEach((value, key) => {
        originalGElements.current.set(key, value);
      });
    },
    []
  );

  const optimizeLevelElements = useCallback(
    (
      svgElement: SVGElement | null,
      currentElementId: string | null,
      bruteOptimization = false
    ) => {
      if (!svgElement) return;

      const levelNum = currentElementId ? getLevelById(currentElementId) : 0;

      if (levelNum > 0) {
        const currentLevelSelector = `[id="${currentElementId}"]`;

        // Restore current level to original
        restoreOriginal(svgElement, currentLevelSelector, false);

        // If we're at max level, no need to optimize next level
        if (levelNum >= MAX_LEVEL) return;
      }

      // Get next level selector
      const nextLevelNum = levelNum + 1;
      const nextLevelKey = INVERSE_DICT[nextLevelNum];
      const nextLevelSelector =
        levelNum === 0
          ? `[id*="${nextLevelKey}"]`
          : `#${currentElementId} [id*="${nextLevelKey}"]`;

      // Replace next level with optimized version

      const optimizeNextLevel = nextLevelNum < MAX_LEVEL || bruteOptimization;

      if (optimizeNextLevel) {
        replaceWithOptimized(svgElement, nextLevelSelector);
      }
    },
    [restoreOriginal, replaceWithOptimized]
  );

  return {
    replaceWithOptimized,
    restoreOriginal,
    optimizeAllElements,
    optimizeLevelElements,
  };
};

import { useCallback, useRef } from "react";
import { optimizeSvg } from "./utils";
import { INVERSE_DICT, MAX_LEVEL } from "../Processogram/consts";
import { getLevelById } from "../Processogram/utils";

type ReplaceWithOptimizedParams = {
  svgElement: SVGElement | null;
  selector: string;
};

type RestoreOriginalParams = {
  selector: string;
  bruteOptimization?: boolean;
};

type OptimizeLevelElementsParams = {
  currentElementId: string | null;
  bruteOptimization?: boolean;
};

export const useOptimizeSvgParts = (svgElement: SVGElement | null) => {
  const originalGElements = useRef<Map<string, SVGElement>>(new Map());
  const optimizedGElements = useRef<Map<string, SVGElement>>(new Map());

  const replaceWithOptimized = useCallback(
    ({ svgElement, selector }: ReplaceWithOptimizedParams) => {
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
    ({ selector, bruteOptimization }: RestoreOriginalParams) => {
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

  const optimizeAllElements = useCallback(async () => {
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
  }, []);

  const optimizeLevelElements = useCallback(
    ({ currentElementId, bruteOptimization }: OptimizeLevelElementsParams) => {
      if (!svgElement) return;

      const levelNum = currentElementId ? getLevelById(currentElementId) : 0;

      if (levelNum > 0) {
        const currentLevelSelector = `[id="${currentElementId}"]`;

        // Restore current level to original
        restoreOriginal({
          selector: currentLevelSelector,
          bruteOptimization: false,
        });

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
        replaceWithOptimized({ svgElement, selector: nextLevelSelector });
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

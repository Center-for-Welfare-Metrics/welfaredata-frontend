import { useCallback, useRef } from "react";
import { optimizeSvg, processSvgToImage } from "./utils";
import { INVERSE_DICT, MAX_LEVEL } from "../Processogram/consts";
import { getLevelById } from "../Processogram/utils";

type ReplaceWithOptimizedParams = {
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
  const originalRootElement = useRef<SVGElement | null>(null);
  const optimizedRootElement = useRef<SVGElement | null>(null);

  const replaceWithOptimized = useCallback(
    ({ selector }: ReplaceWithOptimizedParams) => {
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
    [svgElement]
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
    [svgElement]
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
  }, [svgElement]);

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
        replaceWithOptimized({ selector: nextLevelSelector });
      }
    },
    [restoreOriginal, replaceWithOptimized, svgElement]
  );

  const optimizeRootElement = useCallback(async () => {
    if (!svgElement) return;

    if (optimizedRootElement.current) {
      svgElement.replaceWith(optimizedRootElement.current);
      return optimizedRootElement.current;
    }

    originalRootElement.current = svgElement;

    const optimizedSvg = await processSvgToImage(svgElement);

    if (!optimizedSvg) return;

    optimizedRootElement.current = optimizedSvg;

    return optimizedSvg;
  }, [svgElement]);

  const restoreRootElement = useCallback(() => {
    if (!svgElement) return;
    if (originalRootElement.current) {
      svgElement.replaceWith(originalRootElement.current);
      return originalRootElement.current;
    }

    return svgElement;
  }, [svgElement]);

  return {
    replaceWithOptimized,
    restoreOriginal,
    optimizeAllElements,
    optimizeLevelElements,
    optimizeRootElement,
    restoreRootElement,
  };
};

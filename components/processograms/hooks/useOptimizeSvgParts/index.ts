import { useCallback, useRef } from "react";
import { getLevelById } from "../../ProcessogramsList/utils";
import { INVERSE_DICT, MAX_LEVEL } from "../../ProcessogramsList/consts";
import { generateRasterSvgElement } from "./utils";

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

export const useOptimizeSvgParts = (
  svgElement: SVGGraphicsElement | null,
  rasterImages: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  }
) => {
  const originalGElements = useRef<Map<string, SVGGraphicsElement>>(
    new Map<string, SVGGraphicsElement>()
  );
  const optimizedGElements = useRef<Map<string, SVGGraphicsElement>>(
    // getCacheOptimizedInstance(instance)
    new Map<string, SVGGraphicsElement>()
  );
  const originalRootElement = useRef<SVGGraphicsElement | null>(null);
  const optimizedRootElement = useRef<SVGGraphicsElement | null>(
    //getCacheRootOptimizedInstance(instance)
    null
  );

  const replaceWithOptimized = useCallback(
    ({ selector }: ReplaceWithOptimizedParams) => {
      if (!svgElement) return;

      const gElements = Array.from(
        svgElement.querySelectorAll(selector)
      ) as SVGGraphicsElement[];

      for (const gElement of gElements) {
        const id = gElement.id;
        if (!id) continue;

        if (gElement.getAttribute("data-optimized")) continue;

        if (optimizedGElements.current.has(id)) {
          const optimizedG = optimizedGElements.current.get(id);
          if (optimizedG) {
            gElement.replaceWith(optimizedG);
          }
        } else {
          const imageUrl = rasterImages[id];
          if (!imageUrl) continue;

          const optimizedElement = generateRasterSvgElement({
            dataUrl: imageUrl.src,
            width: imageUrl.width,
            height: imageUrl.height,
            x: imageUrl.x,
            y: imageUrl.y,
            group: gElement,
          });

          originalGElements.current.set(id, gElement);

          if (optimizedElement) {
            gElement.replaceWith(optimizedElement);
            optimizedGElements.current.set(id, optimizedElement);
          }
        }
      }
    },
    [svgElement, rasterImages]
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
        if (levelNum > MAX_LEVEL) return;
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

  return {
    replaceWithOptimized,
    restoreOriginal,
    optimizeLevelElements,
  };
};

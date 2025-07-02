import { RefObject, useCallback, useMemo, useRef } from "react";
import { MAX_LEVEL } from "../../ProcessogramsList/consts";
import { generateRasterSvgElement } from "./utils";
import { INVERSE_DICT } from "../../utils/extractInfoFromId";
import {
  FOCUSED_FILTER,
  UNFOCUSED_FILTER,
} from "../../ProcessogramComplete/consts";
import { getCurrentTheme } from "@/utils/processogram-theme";
import { useTheme } from "next-themes";
import { useProcessogramTheme } from "../useProcessogramTheme";

type ReplaceWithOptimizedParams = {
  selector: string;
  replaceRoot: boolean;
  applyUnfocusedFilter?: boolean;
};

type RestoreOriginalParams = {
  selector: string;
  restoreRoot: boolean;
  bruteOptimization?: boolean;
};

type OptimizeLevelElementsParams = {
  currentElementId: string | null;
  currentLevel: number;
  bruteOptimization?: boolean;
};

type RasterImage = {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

type UseOptimizeSvgPartsParams = {
  svgElement: SVGGraphicsElement | null;
  currentSvgElement: RefObject<SVGGraphicsElement | null>;
  updateSvgElement: (svgElement: SVGGraphicsElement) => void;
  element: {
    svg_url_dark?: string;
    svg_url_light?: string;
  };
  rasterImages?: {
    [key: string]: RasterImage;
  };
  base64ImagesRef?: RefObject<Map<string, string>>;
};

export const useOptimizeSvgParts = ({
  currentSvgElement,
  svgElement,
  element,
  updateSvgElement,
  base64ImagesRef,
  rasterImages,
}: UseOptimizeSvgPartsParams) => {
  const { resolvedTheme } = useTheme();

  const originalGElements = useRef<Map<string, SVGGraphicsElement>>(
    new Map<string, SVGGraphicsElement>()
  );
  const optimizedGElements = useRef<Map<string, SVGGraphicsElement>>(
    new Map<string, SVGGraphicsElement>()
  );

  const { currentTheme } = useProcessogramTheme({
    element,
  });

  const replaceWithOptimized = useCallback(
    ({
      selector,
      replaceRoot,
      applyUnfocusedFilter,
    }: ReplaceWithOptimizedParams) => {
      if (!currentSvgElement.current) return;

      if (replaceRoot) {
        const rootId = currentSvgElement.current.id;

        if (currentSvgElement.current.getAttribute("data-optimized")) return;

        if (optimizedGElements.current.has(rootId)) {
          const optimizedG = optimizedGElements.current.get(rootId);
          if (optimizedG) {
            if (applyUnfocusedFilter) {
              optimizedG.style.filter = UNFOCUSED_FILTER[currentTheme];
            }
            currentSvgElement.current.replaceWith(optimizedG);
            updateSvgElement(optimizedG);
          }
        } else {
          const imageUrl = rasterImages?.[rootId];
          if (!imageUrl) return;

          const base64Image = base64ImagesRef?.current?.get(rootId);

          const optimizedElement = generateRasterSvgElement({
            dataUrl: base64Image ?? imageUrl.src,
            width: imageUrl.width,
            height: imageUrl.height,
            x: imageUrl.x,
            y: imageUrl.y,
            group: currentSvgElement.current,
          });

          originalGElements.current.set(rootId, currentSvgElement.current);

          if (optimizedElement) {
            if (applyUnfocusedFilter) {
              optimizedElement.style.filter = UNFOCUSED_FILTER[currentTheme];
            }
            currentSvgElement.current.replaceWith(optimizedElement);
            updateSvgElement(optimizedElement);
            optimizedGElements.current.set(rootId, optimizedElement);
          }
        }

        if (!rootId) return;

        return;
      }

      const gElements = Array.from(
        currentSvgElement.current.querySelectorAll(selector)
      ) as SVGGraphicsElement[];

      for (const gElement of gElements) {
        const id = gElement.id;
        if (!id) continue;

        if (gElement.getAttribute("data-optimized")) continue;

        if (optimizedGElements.current.has(id)) {
          const optimizedG = optimizedGElements.current.get(id);
          if (optimizedG) {
            if (applyUnfocusedFilter) {
              optimizedG.style.filter = UNFOCUSED_FILTER[currentTheme];
            }
            gElement.replaceWith(optimizedG);
          }
        } else {
          const imageUrl = rasterImages?.[id];
          if (!imageUrl) continue;

          const base64Image = base64ImagesRef?.current?.get(id);

          const optimizedElement = generateRasterSvgElement({
            dataUrl: base64Image ?? imageUrl.src,
            width: imageUrl.width,
            height: imageUrl.height,
            x: imageUrl.x,
            y: imageUrl.y,
            group: gElement,
          });

          originalGElements.current.set(id, gElement);

          if (optimizedElement) {
            if (applyUnfocusedFilter) {
              optimizedElement.style.filter = UNFOCUSED_FILTER[currentTheme];
            }
            gElement.replaceWith(optimizedElement);
            optimizedGElements.current.set(id, optimizedElement);
          }
        }
      }
    },
    [svgElement, rasterImages, updateSvgElement]
  );

  const restoreOriginal = useCallback(
    ({ selector, bruteOptimization, restoreRoot }: RestoreOriginalParams) => {
      if (!currentSvgElement.current) return;

      if (restoreRoot) {
        const rootId = currentSvgElement.current.id;

        if (!rootId) return;

        if (!currentSvgElement.current.getAttribute("data-optimized")) return;

        if (!originalGElements.current.has(rootId)) return;

        const originalG = originalGElements.current.get(rootId);

        if (!originalG) return;

        originalG.style.filter = FOCUSED_FILTER[currentTheme];

        currentSvgElement.current.replaceWith(originalG);
        updateSvgElement(originalG);

        return;
      }

      const gElements = Array.from(
        currentSvgElement.current.querySelectorAll(selector)
      );
      for (const gElement of gElements) {
        const id = gElement.id;
        if (!gElement.getAttribute("data-optimized")) continue;

        if (!id || !originalGElements.current.has(id)) continue;

        const originalG = originalGElements.current.get(id);

        if (!originalG) continue;

        if (bruteOptimization) {
          if (originalG.tagName === "g") continue;
        }

        originalG.style.filter = FOCUSED_FILTER[currentTheme];

        gElement.replaceWith(originalG);
      }
    },
    [svgElement, updateSvgElement]
  );

  const optimizeLevelElements = useCallback(
    ({
      currentElementId,
      currentLevel,
      bruteOptimization,
    }: OptimizeLevelElementsParams) => {
      if (!currentSvgElement.current) return;

      if (currentLevel === 0) {
        restoreOriginal({
          selector: "",
          bruteOptimization: false,
          restoreRoot: true,
        });
      } else {
        const currentLevelSelector = `[id="${currentElementId}"]`;

        // Restore current level to original
        restoreOriginal({
          selector: currentLevelSelector,
          bruteOptimization: false,
          restoreRoot: false,
        });

        // If we're at max level, no need to optimize next level
        if (currentLevel > MAX_LEVEL) return;
      }

      setTimeout(() => {
        const nextLevelNum = currentLevel + 1;
        const nextLevelKey = INVERSE_DICT[nextLevelNum];

        const nextLevelSelector =
          currentLevel === 0
            ? `[id*="${nextLevelKey}"]`
            : `#${currentElementId} [id*="${nextLevelKey}"]`;

        const optimizeNextLevel = nextLevelNum < MAX_LEVEL || bruteOptimization;

        if (optimizeNextLevel) {
          replaceWithOptimized({
            selector: nextLevelSelector,
            replaceRoot: currentLevel === -1,
          });
        }

        const currentLevelKey = INVERSE_DICT[currentLevel];

        const sameLevelSelector = `[id*="${currentLevelKey}"]:not([id="${currentElementId}"])`;

        replaceWithOptimized({
          selector: sameLevelSelector,
          replaceRoot: false,
          applyUnfocusedFilter: true,
        });
      }, 0);
    },
    [restoreOriginal, replaceWithOptimized, svgElement]
  );

  return {
    replaceWithOptimized,
    restoreOriginal,
    optimizeLevelElements,
  };
};

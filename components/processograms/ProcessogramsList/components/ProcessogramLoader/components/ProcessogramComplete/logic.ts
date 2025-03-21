import { useCallback, useEffect, useRef, useState } from "react";
import { INVERSE_DICT, MAX_LEVEL } from "./consts";
import { getLevelById } from "./utils";
import { gsap } from "gsap";
import { useSvgCssRules } from "./useSvgCssRules";
import { useOptimizeSvgParts } from "@/components/processograms/hooks/useOptimizeSvgParts";
import { getElementViewBox } from "@/components/processograms/processogram-helpers";

type HistoryLevel = {
  [key: number]: {
    id: string;
  };
};

type Props = {
  enableBruteOptimization?: boolean;
  path: string;
  onClose: () => void;
};

export const useProcessogramLogic = ({
  enableBruteOptimization,
  path,
  onClose,
}: Props) => {
  // Refs
  const [svgElement, setSvgElement] = useState<SVGGraphicsElement | null>(null);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [loadingOptimization, setLoadingOptimization] =
    useState<boolean>(false);
  const historyLevel = useRef<HistoryLevel>({});
  const currentLevel = useRef<number>(0);
  const isReady = useRef<boolean>(false);

  const { optimizeAllElements, optimizeLevelElements } = useOptimizeSvgParts(
    svgElement,
    path
  );

  const { initializeStyleSheet, cleanupStyleSheet } = useSvgCssRules();

  const initializeOptimization = useCallback(async () => {
    setLoadingOptimization(true);
    await optimizeAllElements();
    optimizeLevelElements({
      currentElementId: null,
      bruteOptimization: enableBruteOptimization,
    });
    setLoadingOptimization(false);
  }, [optimizeAllElements, optimizeLevelElements]);

  const outOfFocusAnimation = useRef<gsap.core.Tween | null>(null);

  const changeLevelTo = useCallback(
    (target: SVGElement) => {
      if (!svgElement) return;
      const viewBox = getElementViewBox(target);
      const id = target.id;
      const currentLevelById = getLevelById(id);
      historyLevel.current[currentLevelById] = {
        id,
      };

      currentLevel.current = currentLevelById;
      setFocusedElementId(id);

      const isMaxLevel = currentLevelById === MAX_LEVEL;

      let outOfFocusSelector: string | null = null;

      if (isMaxLevel) {
        const levelID = INVERSE_DICT[currentLevelById];
        outOfFocusSelector = `[id*="${levelID}"]:not([id="${id}"])`;
      } else {
        outOfFocusSelector = `[data-optimized="true"]:not([id^="${id}"] *):not([id="${id}"])`;
      }

      const outOfFocusElements =
        svgElement.querySelectorAll(outOfFocusSelector);

      console.log(outOfFocusElements);

      if (outOfFocusAnimation.current) {
        outOfFocusAnimation.current.revert();
      }

      if (outOfFocusElements.length > 0) {
        outOfFocusAnimation.current = gsap.to(outOfFocusElements, {
          filter: "brightness(0.5)",
          duration: 0.7,
          ease: "power1.inOut",
        });
      }

      // Set the viewBox of the SVG element to the new viewBox
      gsap.fromTo(
        svgElement,
        { pointerEvents: "none", duration: 0 },
        {
          attr: {
            viewBox,
          },
          duration: 0.7,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(svgElement, {
              pointerEvents: "auto",
              onComplete: () => {
                optimizeLevelElements({
                  currentElementId: id,
                  bruteOptimization: enableBruteOptimization,
                });
              },
            });
          },
        }
      );
    },
    [svgElement, optimizeLevelElements, setFocusedElementId]
  );

  const getClickedStage = useCallback((target: SVGElement, level: number) => {
    const selector = `[id*="${INVERSE_DICT[level + 1]}"]`;
    const stageClicked = target.closest(selector) as SVGElement | null;
    return stageClicked;
  }, []);

  const handleClick = useCallback(
    async (event: MouseEvent) => {
      if (!svgElement) return;

      event.stopPropagation();

      const target = event.target as SVGElement;

      const clickedStage = getClickedStage(target, currentLevel.current);

      if (clickedStage) {
        // Navigate deeper
        changeLevelTo(clickedStage);
        return;
      }

      // Navigate back
      const previousLevel = currentLevel.current - 1;
      if (previousLevel < 1) {
        if (previousLevel < 0) {
          onClose();
          return;
        }
        changeLevelTo(svgElement);
        return;
      }
      const previousLevelData = historyLevel.current[previousLevel];
      if (!previousLevelData) return;

      const element = svgElement.querySelector<SVGElement>(
        `#${previousLevelData.id}`
      );

      if (!element) return;

      changeLevelTo(element);
    },
    [changeLevelTo, getClickedStage, svgElement]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick, { passive: false });

    return () => {
      console.log("cleanup");
      window.removeEventListener("click", handleClick);

      cleanupStyleSheet();
    };
  }, [handleClick]);

  useEffect(() => {
    if (isReady.current || !svgElement) return;

    initializeStyleSheet(svgElement);
    setFocusedElementId(svgElement.id);
    initializeOptimization();
    isReady.current = true;
    return () => {
      isReady.current = false;
      cleanupStyleSheet();
    };
  }, [
    initializeStyleSheet,
    setFocusedElementId,
    svgElement,
    initializeOptimization,
    cleanupStyleSheet,
  ]);

  return {
    setSvgElement,
    svgElement,
    focusedElementId,
    loadingOptimization,
  };
};

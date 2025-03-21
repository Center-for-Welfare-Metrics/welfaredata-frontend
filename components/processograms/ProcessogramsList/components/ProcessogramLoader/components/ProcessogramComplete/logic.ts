import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANIMATION_DURATION,
  ANIMATION_EASE,
  INVERSE_DICT,
  MAX_LEVEL,
} from "../../../../consts";
import { getLevelById } from "../../../../utils";
import { gsap } from "gsap";
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
  onChange: (id: string) => void;
};

export const useProcessogramLogic = ({
  enableBruteOptimization,
  path,
  onClose,
  onChange,
}: Props) => {
  // Refs
  const [svgElement, setSvgElement] = useState<SVGGraphicsElement | null>(null);
  const [loadingOptimization, setLoadingOptimization] =
    useState<boolean>(false);

  const [onHover, setOnHover] = useState<string | null>(null);
  const historyLevel = useRef<HistoryLevel>({});
  const currentLevel = useRef<number>(0);
  const isReady = useRef<boolean>(false);

  const { optimizeAllElements, optimizeLevelElements } = useOptimizeSvgParts(
    svgElement,
    path
  );

  const setFullBrightnessToCurrentLevel = useCallback(
    (toPrevious: boolean) => {
      if (!svgElement) return;
      const nextLevel = currentLevel.current + 1;

      if (nextLevel > MAX_LEVEL) return;

      const levelID = INVERSE_DICT[nextLevel];
      const currentLevelElements = svgElement.querySelectorAll(
        `[id*="${levelID}"]`
      );

      if (toPrevious) {
        gsap.to(currentLevelElements, {
          filter: "brightness(1)",
          duration: ANIMATION_DURATION / 2,
          ease: ANIMATION_EASE,
        });
      } else {
        gsap.set(currentLevelElements, {
          filter: "brightness(1)",
        });
      }
    },
    [svgElement]
  );

  const initializeOptimization = useCallback(async () => {
    setLoadingOptimization(true);
    await optimizeAllElements();
    optimizeLevelElements({
      currentElementId: null,
      bruteOptimization: enableBruteOptimization,
    });
    setFullBrightnessToCurrentLevel(false);
    setLoadingOptimization(false);
  }, [
    optimizeAllElements,
    optimizeLevelElements,
    enableBruteOptimization,
    setFullBrightnessToCurrentLevel,
  ]);

  const outOfFocusAnimation = useRef<gsap.core.Tween | null>(null);

  const changeLevelTo = useCallback(
    (target: SVGElement, toPrevious: boolean) => {
      if (!svgElement) return;
      const viewBox = getElementViewBox(target);
      const id = target.id;
      onChange(id);
      const currentLevelById = getLevelById(id);
      historyLevel.current[currentLevelById] = {
        id,
      };

      currentLevel.current = currentLevelById;

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

      if (outOfFocusAnimation.current) {
        outOfFocusAnimation.current.revert();
      }

      if (outOfFocusElements.length > 0) {
        outOfFocusAnimation.current = gsap.to(outOfFocusElements, {
          filter: "brightness(0.3)",
          cursor: "default",
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
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
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
          onComplete: () => {
            gsap.set(svgElement, {
              pointerEvents: "auto",
              onComplete: () => {
                optimizeLevelElements({
                  currentElementId: id,
                  bruteOptimization: enableBruteOptimization,
                });
                setFullBrightnessToCurrentLevel(toPrevious);
              },
            });
          },
        }
      );
    },
    [svgElement, optimizeLevelElements, setFullBrightnessToCurrentLevel]
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
        changeLevelTo(clickedStage, false);
        return;
      }

      // Navigate back
      const previousLevel = currentLevel.current - 1;
      if (previousLevel < 1) {
        if (previousLevel < 0) {
          onClose();
          return;
        }
        changeLevelTo(svgElement, true);
        return;
      }
      const previousLevelData = historyLevel.current[previousLevel];
      if (!previousLevelData) return;

      const element = svgElement.querySelector<SVGElement>(
        `#${previousLevelData.id}`
      );

      if (!element) return;

      changeLevelTo(element, true);
    },
    [changeLevelTo, getClickedStage, svgElement]
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      const target = event.target as SVGElement;

      const nextLevel = currentLevel.current + 1;
      const levelID = INVERSE_DICT[nextLevel];

      const closest = target.closest(`[id*="${levelID}"]`) as SVGElement | null;

      if (!closest) {
        setOnHover(null);
        return;
      }

      setOnHover(closest.id);
    },
    []
  );

  const onMouseLeave = useCallback(() => {
    setOnHover(null);
  }, []);

  useEffect(() => {
    if (!svgElement) return;
    if (!onHover) {
      const hoverSelector = `[id*="${INVERSE_DICT[currentLevel.current + 1]}"]`;

      const hoverElements = svgElement.querySelectorAll(hoverSelector);

      gsap.to(hoverElements, {
        filter: "brightness(1)",
        duration: ANIMATION_DURATION / 2,
        ease: ANIMATION_EASE,
      });

      return;
    }

    const level = getLevelById(onHover);
    const levelID = INVERSE_DICT[level];

    const onHoverSelector = `[id*="${onHover}"]`;
    const onHoverElements = svgElement.querySelectorAll(onHoverSelector);

    const hoverSelector = `[id*="${levelID}"]:not([id="${onHover}"])`;

    const hoverElements = svgElement.querySelectorAll(hoverSelector);

    gsap.to(hoverElements, {
      filter: "brightness(0.3)",
      duration: ANIMATION_DURATION / 2,
      ease: ANIMATION_EASE,
    });

    gsap.to(onHoverElements, {
      filter: "brightness(1)",
      duration: ANIMATION_DURATION / 2,
      ease: ANIMATION_EASE,
    });
  }, [onHover]);

  useEffect(() => {
    window.addEventListener("click", handleClick, { passive: false });

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    if (isReady.current || !svgElement) return;

    initializeOptimization();
    isReady.current = true;
    return () => {
      isReady.current = false;
    };
  }, [svgElement, initializeOptimization]);

  return {
    setSvgElement,
    svgElement,
    loadingOptimization,
    onMouseMove,
    onMouseLeave,
  };
};

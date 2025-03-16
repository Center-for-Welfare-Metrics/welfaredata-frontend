import { useCallback, useEffect, useRef, useState } from "react";
import { getElementViewBox } from "../processogram-helpers";
import { INVERSE_DICT, MAX_LEVEL } from "./consts";
import { getLevelById } from "./utils";
import { gsap } from "gsap";
import { useOptimizeSvgParts } from "../useOptimizeSvgParts";
import { useSvgCssRules } from "./useSvgCssRules";

type HistoryLevel = {
  [key: number]: {
    id: string;
  };
};

type Props = {
  enableBruteOptimization?: boolean;
};

export const useProcessogramLogic = ({ enableBruteOptimization }: Props) => {
  // Refs
  const [svgElement, setSvgElement] = useState<SVGElement | null>(null);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [onTransition, setOnTransition] = useState<boolean>(false);
  const [loadingOptimization, setLoadingOptimization] =
    useState<boolean>(false);
  const historyLevel = useRef<HistoryLevel>({});
  const currentLevel = useRef<number>(0);
  const initialized = useRef<boolean>(false);

  const { optimizeAllElements, optimizeLevelElements } = useOptimizeSvgParts();

  const { initializeStyleSheet, cleanupStyleSheet } = useSvgCssRules();

  const initializeOptimization = useCallback(async () => {
    setLoadingOptimization(true);
    await optimizeAllElements(svgElement);
    optimizeLevelElements(svgElement, null);
    setLoadingOptimization(false);
  }, [svgElement]);

  const changeLevelTo = useCallback(
    (target: SVGElement) => {
      const viewBox = getElementViewBox(target);
      const id = target.id;
      const currentLevelById = getLevelById(id);
      historyLevel.current[currentLevelById] = {
        id,
      };

      currentLevel.current = currentLevelById;
      setOnTransition(true);
      setFocusedElementId(id);
      gsap.to(svgElement, {
        attr: {
          viewBox,
        },
        duration: 0.7,
        ease: "power1.inOut",
        onComplete: () => {
          setOnTransition(false);
          optimizeLevelElements(svgElement, id, enableBruteOptimization);
        },
      });
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
      window.removeEventListener("click", handleClick);

      cleanupStyleSheet();
    };
  }, [handleClick]);

  useEffect(() => {
    if (initialized.current || !svgElement) return;

    initializeStyleSheet(svgElement);
    setFocusedElementId(svgElement.id);
    initializeOptimization();
    initialized.current = true;
    return () => {
      initialized.current = false;
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
    svgRef: setSvgElement,
    focusedElementId,
    onTransition,
    loadingOptimization,
  };
};

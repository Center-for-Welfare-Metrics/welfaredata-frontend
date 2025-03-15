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
  const historyLevel = useRef<HistoryLevel>({});
  const currentLevel = useRef<number>(0);
  const initialized = useRef<boolean>(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const { optimizeAllElements, optimizeLevelElements } = useOptimizeSvgParts();

  const {
    initializeStyleSheet,
    deleteRule,
    insertHighlightRule,
    insertHoverRule,
    cleanupStyleSheet,
  } = useSvgCssRules();

  const initializeOptimization = useCallback(() => {
    optimizeAllElements(svgElement);
    optimizeLevelElements(svgElement, null);
  }, [svgElement]);

  const changeLevelTo = useCallback(
    (target: SVGElement) => {
      const viewBox = getElementViewBox(target);
      const id = target.id;
      const currentLevelById = getLevelById(id);
      const nextLevel = currentLevelById + 1;
      historyLevel.current[currentLevelById] = {
        id,
      };

      currentLevel.current = currentLevelById;

      deleteRule();
      insertHighlightRule(id, currentLevelById);

      gsap.to(svgElement, {
        attr: {
          viewBox,
        },
        duration: 0.7,
        ease: "power1.inOut",
        onComplete: () => {
          optimizeLevelElements(svgElement, id, enableBruteOptimization);
          insertHoverRule(svgElement, id, nextLevel);
        },
      });
    },
    [
      svgElement,
      deleteRule,
      insertHighlightRule,
      insertHoverRule,
      optimizeLevelElements,
    ]
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
    // Skip if already initialized or svgRef is not available
    if (initialized.current || !svgElement) return;

    // Initialize stylesheet
    const style = initializeStyleSheet();
    if (style) {
      styleRef.current = style;

      // Initialize hover effect for first level
      insertHoverRule(svgElement, null, 1);

      // Add click handler
      window.addEventListener("click", handleClick, { passive: false });

      // Mark as initialized
      initializeOptimization();
      initialized.current = true;
    }

    return () => {
      window.removeEventListener("click", handleClick);

      if (styleRef.current) {
        cleanupStyleSheet(styleRef.current);
      }

      // Reset initialized flag
      initialized.current = false;
    };
  }, [
    handleClick,
    svgElement,
    initializeOptimization,
    insertHoverRule,
    cleanupStyleSheet,
  ]);

  return { svgRef: setSvgElement };
};

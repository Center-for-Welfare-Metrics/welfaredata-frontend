import { useCallback, useEffect, useRef, useState } from "react";
import { getElementViewBox } from "../processogram-helpers";
import { INVERSE_DICT, MAX_LEVEL } from "./consts";
import { getLevelById } from "./utils";
import { gsap } from "gsap";
import { useOptimizeSvgParts } from "../useOptimizeSvgParts";

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
  const styleSheet = useRef<CSSStyleSheet | null>(null);
  const initialized = useRef<boolean>(false);
  const ruleCache = useRef<Set<string>>(new Set());

  const { replaceWithOptimized, restoreOriginal } = useOptimizeSvgParts();

  const initializeOptimization = useCallback(() => {
    replaceWithOptimized(svgElement, `[id*="${INVERSE_DICT[MAX_LEVEL]}"]`);
  }, [svgElement]);

  const deleteRule = () => {
    if (!styleSheet.current) return;

    if (!styleSheet.current.cssRules.length) return;

    ruleCache.current.clear();

    while (styleSheet.current.cssRules.length) {
      styleSheet.current.deleteRule(0);
    }
  };

  const insertHighlightRule = (
    focusedElementId: string,
    focusedLevel: number
  ) => {
    if (!focusedElementId) return;

    const levelId = INVERSE_DICT[focusedLevel];

    const focusedRule = `[id*="${levelId}"]:not([id="${focusedElementId}"]){
        filter: brightness(0.5);
      }`;

    if (ruleCache.current.has(focusedRule)) return;

    try {
      styleSheet.current.insertRule(focusedRule, 0);
    } catch (e) {
      console.error("Failed to insert CSS rule:", e);
    }
  };

  const insertHoverRule = (focusedElementId: string | null, level: number) => {
    if (!svgElement || !styleSheet.current) return;

    const svgId = svgElement.id;

    if (!svgId) return;

    const levelString = INVERSE_DICT[level];

    const hoverRule = focusedElementId
      ? `#${focusedElementId}:has([id*="${levelString}"]:hover) > *:not([id*="${levelString}"]:hover) {
      filter: brightness(0.5);
    }`
      : `#${svgId}:has([id*="${levelString}"]:hover) > *:not([id*="${levelString}"]:hover) {
      filter: brightness(0.5);
    }`;

    if (ruleCache.current.has(hoverRule)) return;

    try {
      styleSheet.current.insertRule(hoverRule, 0);
    } catch (e) {
      console.error("Failed to insert CSS rule:", e);
    }
  };

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
        ease: "power2.inOut",
        onComplete: () => {
          insertHoverRule(id, nextLevel);
          if (enableBruteOptimization) return;
          if (currentLevelById + 1 === MAX_LEVEL) {
            console.log("restore");
            restoreOriginal(
              svgElement,
              `#${id} [id*="${INVERSE_DICT[MAX_LEVEL]}"]`,
              enableBruteOptimization
            );
          } else if (currentLevelById < MAX_LEVEL) {
            replaceWithOptimized(
              svgElement,
              `[id*="${INVERSE_DICT[MAX_LEVEL]}"]`
            );
          }
        },
      });
    },
    [svgElement]
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

    // Create stylesheet for highlighting elements
    const style = document.createElement("style");
    document.head.appendChild(style);

    // Store reference to the stylesheet
    if (style.sheet) {
      styleSheet.current = style.sheet;

      // Initialize hover effect for first level
      insertHoverRule(null, 1);

      // Add clcik handler
      window.addEventListener("click", handleClick, { passive: false });

      // Mark as initialized
      initializeOptimization();
      initialized.current = true;
    }

    return () => {
      window.removeEventListener("click", handleClick);

      deleteRule();

      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }

      // Reset initialized flag
      initialized.current = false;
    };
  }, [
    handleClick,
    deleteRule,
    insertHoverRule,
    svgElement,
    initializeOptimization,
  ]);

  return { svgRef: setSvgElement };
};

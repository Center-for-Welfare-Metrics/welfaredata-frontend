import { useCallback, useEffect, useRef, useState } from "react";
import { getElementViewBox } from "../processogram-helpers";
import { INVERSE_DICT } from "./consts";
import { getLevelById } from "./utils";
import { gsap } from "gsap";

export const useProcessogramLogic = () => {
  const [svgRef, setSvgRef] = useState<SVGElement | null>(null);

  const historyLevel = useRef<{
    [key: number]: {
      id: string;
    };
  }>({});
  const currentLevel = useRef<number>(0);
  const styleSheet = useRef<HTMLStyleElement | null>(null);
  const initialized = useRef<boolean>(false);

  const deleteRule = () => {
    if (!styleSheet.current) return;

    if (!styleSheet.current.sheet.cssRules.length) return;

    styleSheet.current.sheet.deleteRule(0);
  };

  const insertHoverRule = (parentElement: string | null, level: number) => {
    deleteRule();

    if (!svgRef) return;
    if (!styleSheet.current) return;

    const levelString = INVERSE_DICT[level];

    const hoverRule = parentElement
      ? `#${parentElement}:has([id*="${levelString}"]:hover) > *:not([id*="${levelString}"]:hover) {
      filter: brightness(0.5);
    }`
      : `#${svgRef.id}:has([id*="${levelString}"]:hover) > *:not([id*="${levelString}"]:hover) {
      filter: brightness(0.5);
    }`;

    styleSheet.current.sheet.insertRule(hoverRule, 0);
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
      gsap.to(svgRef, {
        attr: {
          viewBox: viewBox,
        },
        onComplete: () => {
          insertHoverRule(id, nextLevel);
        },
      });
    },
    [svgRef]
  );

  const getClickedStage = useCallback((target: SVGElement, level: number) => {
    const selector = `[id*="${INVERSE_DICT[level + 1]}"]`;
    const stageClicked = target.closest(selector) as SVGElement | null;
    return stageClicked;
  }, []);

  const onClick = useCallback(
    async (event: MouseEvent) => {
      event.stopPropagation();
      const clickedStage = getClickedStage(
        event.target as SVGElement,
        currentLevel.current
      );
      if (clickedStage) {
        changeLevelTo(clickedStage);
        return;
      }

      const previousLevel = currentLevel.current - 1;
      if (previousLevel < 1) {
        const element = svgRef;
        changeLevelTo(element);
        return;
      }
      const previousLevelData = historyLevel.current[previousLevel];
      if (!previousLevelData) return;

      const element = svgRef.querySelector<SVGElement>(
        `#${previousLevelData.id}`
      );

      if (!element) return;

      changeLevelTo(element);
    },
    [svgRef, changeLevelTo, getClickedStage]
  );

  useEffect(() => {
    if (initialized.current) return;

    if (!svgRef) return;
    const sheet = document.createElement("style");
    document.head.appendChild(sheet);
    styleSheet.current = sheet;
    window.addEventListener("click", onClick, { passive: false });
    insertHoverRule(null, 1);
    initialized.current = true;

    return () => {
      window.removeEventListener("click", onClick);
      deleteRule();
      if (styleSheet.current) {
        document.head.removeChild(styleSheet.current);
      }
    };
  }, [onClick, svgRef]);

  return { setSvgRef };
};

import { useCallback, useEffect, useRef, useState } from "react";
import { getElementViewBox } from "../processogram-helpers";
import { INVERSE_DICT } from "./consts";
import { getLevelById } from "./utils";
import { gsap } from "gsap";

export const useProcessogramLogic = () => {
  const [svgRef, setSvgRef] = useState<SVGElement | null>(null);

  const currentInteractableElements = useRef<NodeListOf<SVGElement> | null>(
    null
  );
  const historyLevel = useRef<{
    [key: number]: {
      id: string;
    };
  }>({});
  const currentLevel = useRef<number>(0);
  const styleSheet = useRef<HTMLStyleElement | null>(null);
  const initialized = useRef<boolean>(false);

  const handlersRef = useRef<{
    onClick: (event: MouseEvent) => void;
    onClickOut: (event: MouseEvent) => void;
  }>({
    onClick: () => {},
    onClickOut: () => {},
  });

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

  const attachEvents = useCallback(
    (level: number, parentLevelId: string | null) => {
      if (!svgRef) return;

      window.addEventListener("click", handlersRef.current.onClickOut);

      const byIdSelector = `[id*="${INVERSE_DICT[level]}"]`;

      const fullSelector = parentLevelId
        ? `#${parentLevelId} > ${byIdSelector}`
        : byIdSelector;

      insertHoverRule(parentLevelId, level);

      currentInteractableElements.current =
        svgRef.querySelectorAll<SVGElement>(fullSelector);

      if (!currentInteractableElements.current) return;

      const elementsArray = Array.from(currentInteractableElements.current);
      for (const element of elementsArray) {
        element.addEventListener("click", handlersRef.current.onClick);
      }
    },
    [svgRef]
  );

  const detachEvents = useCallback(() => {
    if (!currentInteractableElements.current) return;

    window.removeEventListener("click", handlersRef.current.onClickOut);
    deleteRule();
    const elementsArray = Array.from(currentInteractableElements.current);
    for (const element of elementsArray) {
      element.removeEventListener("click", handlersRef.current.onClick);
    }
  }, []);

  const changeLevelTo = useCallback(
    async (target: SVGElement) => {
      const viewBox = getElementViewBox(target);
      const id = target.id;
      const currentLevelById = getLevelById(id);
      const nextLevel = currentLevelById + 1;
      historyLevel.current[currentLevelById] = {
        id,
      };
      currentLevel.current = currentLevelById;
      detachEvents();
      await gsap.to(svgRef, {
        attr: {
          viewBox: viewBox,
        },
      });
      attachEvents(nextLevel, id);
    },
    [svgRef]
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const currentTarget = event.currentTarget as SVGElement;
      changeLevelTo(currentTarget);
    },
    [changeLevelTo]
  );

  const onClickOut = useCallback(
    async (event: MouseEvent) => {
      event.stopPropagation();
      const previousLevel = currentLevel.current - 1;
      console.log(previousLevel);
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
    [svgRef, changeLevelTo]
  );

  useEffect(() => {
    handlersRef.current = {
      onClick,
      onClickOut,
    };
  }, [onClick, onClickOut]);

  useEffect(() => {
    if (initialized.current) return;

    if (!svgRef) return;
    const sheet = document.createElement("style");
    document.head.appendChild(sheet);
    styleSheet.current = sheet;
    attachEvents(1, null);
    initialized.current = true;
  }, [svgRef]);

  return { setSvgRef };
};

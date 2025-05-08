import { RefObject, useEffect } from "react";
import { gsap } from "gsap";
import {
  getLevelNumberById,
  INVERSE_DICT,
} from "../../utils/extractInfoFromId";
import {
  ANIMATION_DURATION,
  ANIMATION_EASE,
} from "../../ProcessogramsList/consts";
import { ProcessogramHierarchy } from "types/processogram";

type Props = {
  svgElement: SVGElement | null;
  onHover: string | null;
  currentLevel: RefObject<number>;
  currentElementId: RefObject<string | null>;
  isReady: RefObject<boolean>;
  onChange: (id: string, hierarchy: ProcessogramHierarchy[]) => void;
  initializeOptimization: () => void;
  handleClick: (event: MouseEvent) => void;
  getElementIdentifierWithHierarchy: (
    elementId: string
  ) => [string, ProcessogramHierarchy[]];
};

export const useProcessogramEffects = ({
  currentElementId,
  currentLevel,
  handleClick,
  initializeOptimization,
  isReady,
  onChange,
  onHover,
  svgElement,
  getElementIdentifierWithHierarchy,
}: Props) => {
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

    const level = getLevelNumberById(onHover);
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
    if (isReady.current || !svgElement || currentLevel.current > -1) return;

    initializeOptimization();
    isReady.current = true;
    return () => {
      isReady.current = false;
    };
  }, [svgElement, initializeOptimization]);

  useEffect(() => {
    if (!svgElement) return;

    const elementId = onHover || currentElementId.current;

    if (!elementId) {
      onChange("", []);
      return;
    }

    const [identifier, hierarchy] =
      getElementIdentifierWithHierarchy(elementId);

    onChange(identifier, hierarchy);
  }, [onHover]);
};

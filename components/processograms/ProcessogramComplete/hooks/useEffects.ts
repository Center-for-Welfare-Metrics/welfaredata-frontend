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
  startFromSpecie: boolean;
  isActive: boolean;
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
  startFromSpecie,
  isActive,
}: Props) => {
  useEffect(() => {
    if (!svgElement) return;

    if (!onHover) {
      const currentLevel = getLevelNumberById(currentElementId.current);
      const currentLevelId = INVERSE_DICT[currentLevel];

      const notHover = `[id*="${currentLevelId}"]:not([id="${currentElementId.current}"])`;

      const notHoverElements = svgElement.querySelectorAll(notHover);

      gsap.to(notHoverElements, {
        filter: "brightness(0.3)",
        duration: ANIMATION_DURATION / 2,
        ease: ANIMATION_EASE,
      });

      const nextLevelId = INVERSE_DICT[currentLevel + 1];

      const hoverSelector = `[id="${currentElementId.current}"],[id*="${nextLevelId}"]`;

      const hoverElements = svgElement.querySelectorAll(hoverSelector);

      gsap.to(hoverElements, {
        filter: "brightness(1)",
        duration: ANIMATION_DURATION / 2,
        ease: ANIMATION_EASE,
      });
    }

    if (onHover) {
      const onHoverLevel = getLevelNumberById(onHover);
      const currentLevel = getLevelNumberById(currentElementId.current);

      if (onHoverLevel === currentLevel) {
        const hoverSelector = `[id="${onHover}"]`;
        const hoverElements = svgElement.querySelectorAll(hoverSelector);
        gsap.to(hoverElements, {
          filter: "brightness(1)",
          duration: ANIMATION_DURATION / 2,
          ease: ANIMATION_EASE,
        });

        const onHoverKey = INVERSE_DICT[onHoverLevel];

        const notHoverElement = `[id*="${onHoverKey}"]:not([id="${onHover}"])`;
        const notHoverElements = svgElement.querySelectorAll(notHoverElement);
        gsap.to(notHoverElements, {
          filter: "brightness(0.3)",
          duration: ANIMATION_DURATION / 2,
          ease: ANIMATION_EASE,
        });
      } else {
        const level = getLevelNumberById(onHover);
        const levelID = INVERSE_DICT[level];
        const currentElementLevel = getLevelNumberById(
          currentElementId.current
        );
        const currentLevelId = INVERSE_DICT[currentElementLevel];
        const onHoverSelector = `[id="${onHover}"],[id="${currentElementId.current}"]`;
        const onHoverElements = svgElement.querySelectorAll(onHoverSelector);
        const notHoverSelector = `[id*="${currentLevelId}"]:not([id="${onHover}"]),[id*="${levelID}"]:not([id="${onHover}"])`;
        const notHoverElements = svgElement.querySelectorAll(notHoverSelector);
        gsap.to(notHoverElements, {
          filter: "brightness(0.3)",
          duration: ANIMATION_DURATION / 2,
          ease: ANIMATION_EASE,
        });
        gsap.to(onHoverElements, {
          filter: "brightness(1)",
          duration: ANIMATION_DURATION / 2,
          ease: ANIMATION_EASE,
        });
      }
    }
  }, [onHover]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener("click", handleClick, { passive: false });
    }
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick, isActive]);

  useEffect(() => {
    if (isReady.current || !svgElement) return;

    if (startFromSpecie && currentLevel.current > -1) return;

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

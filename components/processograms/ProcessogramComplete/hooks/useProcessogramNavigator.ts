import { RefObject, useCallback, useRef } from "react";
import { gsap } from "gsap";

import {
  getElementIdentifier,
  getHierarchy,
} from "../../ProcessogramsList/utils/hierarchy";
import { ProcessogramHierarchy } from "types/processogram";
import {
  getLevelNumberById,
  INVERSE_DICT,
} from "../../utils/extractInfoFromId";
import { getElementViewBox } from "../../ProcessogramsList/utils/getElementViewBox";
import {
  ANIMATION_DURATION,
  ANIMATION_EASE,
  MAX_LEVEL,
} from "../../ProcessogramsList/consts";
import { HistoryLevel } from "../logic";
import { UNFOCUSED_FILTER } from "../consts";

type Props = {
  svgElement: SVGElement | null;
  optimizeLevelElements: (args: {
    currentElementId: string;
    currentLevel: number;
    bruteOptimization?: boolean;
  }) => void;
  setFullBrightnessToCurrentLevel: (toPrevious: boolean) => void;
  onChange: (identifier: string, hierarchy: ProcessogramHierarchy[]) => void;
  historyLevel: RefObject<HistoryLevel>;
  lockInteraction: RefObject<boolean>;
  currentLevel: RefObject<number>;
  currentElementId: RefObject<string | null>;
  getElementIdentifierWithHierarchy: (
    elementId: string
  ) => [string, ProcessogramHierarchy[]];
  currentTheme: "dark" | "light";
  enableBruteOptimization?: boolean;
};

export const useProcessogramNavigator = ({
  enableBruteOptimization,
  historyLevel,
  lockInteraction,
  onChange,
  optimizeLevelElements,
  setFullBrightnessToCurrentLevel,
  svgElement,
  currentElementId,
  currentLevel,
  currentTheme,
  getElementIdentifierWithHierarchy,
}: Props) => {
  const outOfFocusAnimation = useRef<gsap.core.Tween | null>(null);

  const changeLevelTo = useCallback(
    (target: SVGElement, toPrevious: boolean, callback?: () => void) => {
      if (!svgElement) return;
      const viewBox = getElementViewBox(target);
      if (!viewBox) return;
      const id = target.id;
      const currentLevelById = getLevelNumberById(id);
      historyLevel.current[currentLevelById] = {
        id,
      };

      currentElementId.current = id;
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
          filter: UNFOCUSED_FILTER[currentTheme],
          // cursor: "default",
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
        });
      }

      const [identifier, hierarchy] = getElementIdentifierWithHierarchy(id);

      onChange(identifier, hierarchy);

      lockInteraction.current = true;

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
                  currentLevel: currentLevelById,
                  bruteOptimization: enableBruteOptimization,
                });
                setFullBrightnessToCurrentLevel(toPrevious);
                lockInteraction.current = false;
                if (callback) {
                  callback();
                }
              },
            });
          },
        }
      );
    },
    [svgElement, optimizeLevelElements, setFullBrightnessToCurrentLevel]
  );

  return { changeLevelTo, getElementIdentifierWithHierarchy };
};

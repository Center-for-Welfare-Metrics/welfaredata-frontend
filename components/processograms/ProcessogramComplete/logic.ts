import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANIMATION_DURATION,
  ANIMATION_EASE,
  MAX_LEVEL,
} from "../ProcessogramsList/consts";
import { gsap } from "gsap";
import { useOptimizeSvgParts } from "@/components/processograms/hooks/useOptimizeSvgParts";
import { getElementViewBox } from "@/components/processograms/ProcessogramsList/utils/getElementViewBox";
import {
  getElementIdentifier,
  getHierarchy,
} from "@/components/processograms/ProcessogramsList/utils/hierarchy";
import {
  getLevelNumberById,
  INVERSE_DICT,
} from "@/components/processograms/utils/extractInfoFromId";
import { ProcessogramHierarchy } from "types/processogram";
import { EventBusHandler, EventBusProps, EventBusTypes } from "./types";

type HistoryLevel = {
  [key: number]: {
    id: string;
  };
};

type Props = {
  enableBruteOptimization?: boolean;
  onClose: () => void;
  onChange: (id: string, hierarchy: ProcessogramHierarchy[]) => void;
  eventBusHandler: EventBusHandler;
  rasterImages: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
};

export const useProcessogramLogic = ({
  enableBruteOptimization,
  onClose,
  onChange,
  eventBusHandler,
  rasterImages,
}: Props) => {
  // Refs
  const [svgElement, setSvgElement] = useState<SVGGraphicsElement | null>(null);
  const [loadingOptimization, setLoadingOptimization] =
    useState<boolean>(false);

  const [onHover, setOnHover] = useState<string | null>(null);
  const historyLevel = useRef<HistoryLevel>({});
  const currentLevel = useRef<number>(0);
  const lockInteraction = useRef<boolean>(false);
  const currentElementId = useRef<string | null>(null);

  const isReady = useRef<boolean>(false);

  const { optimizeLevelElements } = useOptimizeSvgParts(
    svgElement,
    rasterImages
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
    optimizeLevelElements({
      currentElementId: null,
      bruteOptimization: enableBruteOptimization,
    });
    setFullBrightnessToCurrentLevel(false);
    setLoadingOptimization(false);
  }, [
    optimizeLevelElements,
    enableBruteOptimization,
    setFullBrightnessToCurrentLevel,
  ]);

  const getElementIdentifierWithHierarchy = useCallback(
    (elementId: string): [string, ProcessogramHierarchy[]] => {
      if (!svgElement) return ["", []];

      if (!elementId || svgElement.id === elementId) {
        return ["", []];
      }

      const element = svgElement.querySelector<SVGElement>(`#${elementId}`);

      if (element) {
        const hierarchy = getHierarchy(element);

        if (hierarchy.hierarchy.length > 0) {
          const elementIdentifier = getElementIdentifier(
            elementId,
            hierarchy.hierarchy
          );

          return [elementIdentifier, hierarchy.hierarchyPath];
        }
      }

      return ["", []];
    },
    [svgElement]
  );

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
          filter: "brightness(0.3)",
          cursor: "default",
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

  const getClickedStage = useCallback((target: SVGElement, level: number) => {
    const selector = `[id*="${INVERSE_DICT[level + 1]}"]`;
    const stageClicked = target.closest(selector) as SVGElement | null;
    return stageClicked;
  }, []);

  const handleClick = useCallback(
    async (event: MouseEvent) => {
      if (!svgElement) return;

      if (lockInteraction.current) return;

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
      if (lockInteraction.current) return;

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

  const changeLevelByEventBus = useCallback(
    (id: string) => {
      if (!svgElement) return;

      if (svgElement.id === id) {
        changeLevelTo(svgElement, true);
        return;
      }

      const element = svgElement.querySelector<SVGElement>(`#${id}`);
      if (!element) return;
      const level = getLevelNumberById(id);

      const toPrevious = level < currentLevel.current;

      changeLevelTo(element, toPrevious);
    },
    [changeLevelTo]
  );

  const closeByEventBus = useCallback(() => {
    if (!svgElement) return;

    if (currentLevel.current > 0) {
      changeLevelTo(svgElement, true, () => {
        onClose();
      });
    } else {
      onClose();
    }
  }, [changeLevelTo, onClose]);

  const attachEventBus = useCallback(
    (eventBus: EventBusHandler) => {
      const actions: {
        [key in EventBusTypes]: (payload: {} | { id: string }) => void;
      } = {
        CHANGE_LEVEL: (params) => {
          if ("id" in params) {
            const { id } = params;
            changeLevelByEventBus(id);
          }
        },
        CLOSE: () => {
          closeByEventBus();
        },
      };

      const events = {
        publish: (event: EventBusProps) => {
          const action = actions[event.type];
          if (action) {
            if (event.type === "CLOSE") action(event.payload);
          }
        },
      };

      eventBus(events);
    },
    [changeLevelByEventBus, closeByEventBus]
  );

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
    if (isReady.current || !svgElement) return;

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

  useEffect(() => {
    if (eventBusHandler) {
      attachEventBus(eventBusHandler);
    }
  }, [attachEventBus, eventBusHandler]);

  return {
    setSvgElement,
    svgElement,
    loadingOptimization,
    onMouseMove,
    onMouseLeave,
  };
};

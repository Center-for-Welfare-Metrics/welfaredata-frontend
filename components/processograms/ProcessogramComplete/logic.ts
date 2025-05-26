import { RefObject, useCallback, useEffect, useRef, useState } from "react";
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
import { useEventBus } from "./hooks/useEventBus";
import { useProcessogramNavigator } from "./hooks/useProcessogramNavigator";
import { useProcessogramEventHanders } from "./hooks/useEventHandlers";
import { useProcessogramEffects } from "./hooks/useEffects";
import { useProcessogramHelpers } from "./hooks/useHelpers";
import { FOCUSED_FILTER } from "./consts";

export type HistoryLevel = {
  [key: number]: {
    id: string;
  };
};

type Props = {
  enableBruteOptimization?: boolean;
  onClose: () => void;
  onChange: (id: string, hierarchy: ProcessogramHierarchy[]) => void;
  eventBusHandler: EventBusHandler;
  startFromSpecie: boolean;
  rasterImages: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
  isActive: boolean;
  theme: "dark" | "light";
  base64ImagesRef?: RefObject<Map<string, string>>;
  disableHover?: boolean;
};

export const useProcessogramLogic = ({
  enableBruteOptimization,
  onClose,
  onChange,
  eventBusHandler,
  startFromSpecie,
  rasterImages,
  isActive,
  theme,
  base64ImagesRef,
  disableHover,
}: Props) => {
  // Refs

  const [svgElement, setSvgElement] = useState<SVGGraphicsElement | null>(null);

  const currentSvgElement = useRef<SVGGraphicsElement | null>(null);

  const updateSvgElement = useCallback(
    (svgElement: SVGGraphicsElement) => {
      currentSvgElement.current = svgElement;
      setSvgElement(svgElement);
    },
    [setSvgElement]
  );

  const [loadingOptimization, setLoadingOptimization] =
    useState<boolean>(false);

  const [onHover, setOnHover] = useState<string | null>(null);
  const historyLevel = useRef<HistoryLevel>({});
  const currentLevel = useRef<number>(startFromSpecie ? -1 : 0);
  const lockInteraction = useRef<boolean>(false);
  const currentElementId = useRef<string | null>(null);

  const isReady = useRef<boolean>(false);

  const { optimizeLevelElements } = useOptimizeSvgParts(
    svgElement,
    currentSvgElement,
    updateSvgElement,
    rasterImages,
    theme,
    base64ImagesRef
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
          filter: FOCUSED_FILTER[theme],
          duration: ANIMATION_DURATION / 2,
          ease: ANIMATION_EASE,
        });
      } else {
        gsap.set(currentLevelElements, {
          filter: FOCUSED_FILTER[theme],
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
      currentLevel: currentLevel.current,
    });
    setFullBrightnessToCurrentLevel(false);
    setLoadingOptimization(false);
  }, [
    optimizeLevelElements,
    enableBruteOptimization,
    setFullBrightnessToCurrentLevel,
  ]);

  const { getElementIdentifierWithHierarchy } = useProcessogramHelpers({
    svgElement,
  });

  const { changeLevelTo } = useProcessogramNavigator({
    currentElementId,
    currentLevel,
    historyLevel,
    lockInteraction,
    onChange,
    optimizeLevelElements,
    setFullBrightnessToCurrentLevel,
    svgElement,
    enableBruteOptimization,
    getElementIdentifierWithHierarchy,
    theme,
  });

  const { handleClick, onMouseLeave, onMouseMove } =
    useProcessogramEventHanders({
      changeLevelTo,
      currentLevel,
      historyLevel,
      lockInteraction,
      onClose,
      setOnHover,
      svgElement,
      optimizeLevelElements,
      startFromSpecie,
    });

  useEventBus({
    changeLevelTo,
    currentLevel,
    svgElement,
    onClose,
    eventBusHandler,
    optimizeLevelElements,
    startFromSpecie,
  });

  useProcessogramEffects({
    currentElementId,
    currentLevel,
    getElementIdentifierWithHierarchy,
    handleClick,
    initializeOptimization,
    isReady,
    onChange,
    onHover,
    svgElement,
    startFromSpecie,
    isActive,
    theme,
    disableHover,
  });

  return {
    updateSvgElement,
    svgElement,
    loadingOptimization,
    onMouseMove,
    onMouseLeave,
  };
};

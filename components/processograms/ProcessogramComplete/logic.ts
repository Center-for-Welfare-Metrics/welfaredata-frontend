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
import { useEventBus } from "./hooks/useEventBus";
import { useProcessogramNavigator } from "./hooks/useProcessogramNavigator";
import { useProcessogramEventHanders } from "./hooks/useEventHandlers";
import { useProcessogramEffects } from "./hooks/useEffects";
import { useProcessogramHelpers } from "./hooks/useHelpers";

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
    });

  useEventBus({
    changeLevelTo,
    currentLevel,
    svgElement,
    onClose,
    eventBusHandler,
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
  });

  return {
    setSvgElement,
    svgElement,
    loadingOptimization,
    onMouseMove,
    onMouseLeave,
  };
};

import { RefObject, useCallback, useEffect } from "react";
import { getLevelNumberById } from "../../utils/extractInfoFromId";
import { EventBusHandler, EventBusProps, EventBusTypes } from "../types";

type Props = {
  changeLevelTo: (
    element: SVGElement,
    toPrevious: boolean,
    callback?: () => void
  ) => void;
  svgElement: SVGElement | null;
  currentLevel: RefObject<number>;
  onClose: () => void;
  eventBusHandler: EventBusHandler;
  optimizeLevelElements: (args: {
    currentElementId: string | null;
    currentLevel: number;
    bruteOptimization?: boolean;
  }) => void;
  startFromSpecie: boolean;
};

export const useEventBus = ({
  changeLevelTo,
  currentLevel,
  svgElement,
  onClose,
  eventBusHandler,
  optimizeLevelElements,
  startFromSpecie,
}: Props) => {
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
        if (startFromSpecie) {
          currentLevel.current = -1;
          optimizeLevelElements({
            currentElementId: null,
            currentLevel: -1,
            bruteOptimization: false,
          });
        }
        onClose();
      });
    } else {
      onClose();
    }
  }, [changeLevelTo]);

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
            action(event.payload);
          }
        },
      };

      eventBus(events);
    },
    [changeLevelByEventBus, closeByEventBus]
  );

  useEffect(() => {
    if (eventBusHandler) {
      attachEventBus(eventBusHandler);
    }
  }, [attachEventBus, eventBusHandler]);
};

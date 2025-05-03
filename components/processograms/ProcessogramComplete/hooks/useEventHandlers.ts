import { RefObject, useCallback } from "react";
import { INVERSE_DICT } from "../../utils/extractInfoFromId";
import { HistoryLevel } from "../logic";

type Props = {
  svgElement: SVGElement | null;
  changeLevelTo: (element: SVGElement, toPrevious: boolean) => void;
  setOnHover: (id: string | null) => void;
  onClose: () => void;
  lockInteraction: RefObject<boolean>;
  currentLevel: RefObject<number>;
  historyLevel: RefObject<HistoryLevel>;
};

export const useProcessogramEventHanders = ({
  svgElement,
  changeLevelTo,
  setOnHover,
  onClose,
  lockInteraction,
  currentLevel,
  historyLevel,
}: Props) => {
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

  return {
    handleClick,
    onMouseMove,
    onMouseLeave,
  };
};

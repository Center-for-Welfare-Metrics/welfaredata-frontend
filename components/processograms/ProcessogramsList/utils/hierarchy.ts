import { deslugify } from "@/utils/string";
import {
  getElementLevelFromId,
  getElementNameFromId,
  getLevelAliasFromId,
} from "../../utils/extractInfoFromId";
import { ElementHierarchy } from "types/elements";
import { Hierarchy } from "types/element-data";

const levels = {
  ps: 0,
  lf: 1,
  ph: 2,
  ci: 3,
};

const levels_inverted = {
  0: "ps",
  1: "lf",
  2: "ph",
  3: "ci",
};

type GetHierarchy = {
  hierarchy: Hierarchy;
  hierarchyPath: Hierarchy;
};

export const getHierarchy = (element: Element): GetHierarchy => {
  const level = getLevelAliasFromId(element.id);
  const levelNumber = levels[level as keyof typeof levels];

  if (!levelNumber) {
    return {
      hierarchy: [],
      hierarchyPath: [],
    };
  }

  let previousLevel = levelNumber - 1;

  const hierarchy: Hierarchy = [];

  let currentElement = element;

  while (currentElement && previousLevel >= 0) {
    const levelString =
      levels_inverted[previousLevel as keyof typeof levels_inverted];

    if (!levelString) {
      break;
    }

    const closest = currentElement.closest(`[id*="--${levelString}"]`);

    if (!closest) {
      break;
    }

    const elementName = getElementNameFromId(closest.id);
    const readableName = deslugify(elementName);
    const levelName = getElementLevelFromId(closest.id);

    hierarchy.push({
      levelNumber: previousLevel,
      level: levelName,
      name: readableName,
      id: elementName,
      rawId: closest.id,
    });

    currentElement = closest;
    previousLevel--;
  }

  const reverseHierarchy = hierarchy.reverse();

  return {
    hierarchy: reverseHierarchy,
    hierarchyPath: [
      ...reverseHierarchy,
      {
        levelNumber,
        level: getElementLevelFromId(element.id),
        name: deslugify(getElementNameFromId(element.id)),
        id: getElementNameFromId(element.id),
        rawId: element.id,
      },
    ],
  };
};

export const getElementIdentifier = (
  id: string,
  hierarchy: ElementHierarchy[]
) => {
  const name = getElementNameFromId(id);

  if (hierarchy.length === 0) {
    return name;
  }

  const hierarchyString = hierarchy
    .sort((a, b) => a.levelNumber - b.levelNumber)
    .map((item) => item.id)
    .join(".");

  return `${hierarchyString}.${name}`;
};

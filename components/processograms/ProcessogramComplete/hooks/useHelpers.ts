import { useCallback } from "react";
import { ProcessogramHierarchy } from "types/processogram";
import {
  getElementIdentifier,
  getHierarchy,
} from "../../ProcessogramsList/utils/hierarchy";

type Props = {
  svgElement: SVGElement | null;
};

export const useProcessogramHelpers = ({ svgElement }: Props) => {
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

  return { getElementIdentifierWithHierarchy };
};

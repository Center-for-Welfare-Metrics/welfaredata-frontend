import { useOptimizeSvgParts } from "../../useOptimizeSvgParts";

type Props = {
  svgElement: SVGElement | null;
};

export const useBeforeStart = ({ svgElement }: Props) => {
  const { optimizeAllElements, optimizeLevelElements } =
    useOptimizeSvgParts(svgElement);

  return {};
};

import { useEffect, useState } from "react";
import { useOptimizeSvgParts } from "../hooks/useOptimizeSvgParts";
import { SvgRenderer } from "../SvgRenderer";

type Props = {
  src: string;
  maxHeight?: string;
};

export const ProcessogramStarter = ({ src, maxHeight }: Props) => {
  const [svgElement, setSvgElement] = useState<SVGGraphicsElement | null>(null);

  const { optimizeRootElement } = useOptimizeSvgParts(svgElement, src);

  useEffect(() => {
    optimizeRootElement();
  }, [optimizeRootElement, svgElement]);

  return (
    <SvgRenderer
      ref={setSvgElement}
      src={src}
      style={{
        maxHeight: maxHeight,
      }}
    />
  );
};

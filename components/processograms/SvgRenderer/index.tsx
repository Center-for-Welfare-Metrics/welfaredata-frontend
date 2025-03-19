import React from "react";
import SVG, { Props as SVGProps } from "react-inlinesvg";

export const SvgRenderer = React.forwardRef<SVGGraphicsElement, SVGProps>(
  (props, ref) => <SVG innerRef={ref} {...props} />
);

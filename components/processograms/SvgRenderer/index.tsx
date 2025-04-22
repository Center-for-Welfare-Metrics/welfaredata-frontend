import React from "react";
import SVG from "react-inlinesvg";

const SVGComponent = SVG as React.FC<any>;

export const SvgRenderer = ({ innerRef, ...rest }: any) => {
  return <SVGComponent {...rest} innerRef={innerRef} />;
};

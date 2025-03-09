import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import SVG, { Props as SVGProps } from "react-inlinesvg";

import { useProcessogramLogic } from "./logic";

const ProcessogramSVG = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} {...props} />
));

export const NewProcessogram = () => {
  const { setSvgRef } = useProcessogramLogic();

  return (
    <SvgContainer>
      <ProcessogramSVG
        ref={setSvgRef}
        src={`/assets/svg/zoo/pig/enhanced intensive.svg`}
      />
    </SvgContainer>
  );
};

const SvgContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > svg {
    height: auto;
    overflow: visible;
    z-index: 77;
    margin-inline: auto;
    opacity: 1;
    display: block;
    min-height: 5rem;
    z-index: 77;
    max-height: 80vh;
    width: 90%;
    * {
      transition: opacity 0.25s ease-in-out, filter 0.25s ease-in-out;
    }
  }
  @media (max-width: 800px) {
    > svg {
      shape-rendering: optimizeSpeed;
      text-rendering: optimizeSpeed;
    }
    :first-child {
      margin-top: 2rem;
    }
    :last-child {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 800px) {
    margin: 1rem 0;
  }
`;

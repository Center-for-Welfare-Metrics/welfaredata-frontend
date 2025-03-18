import React, { useCallback, useEffect, useRef } from "react";
import { styled } from "styled-components";
import SVG, { Props as SVGProps } from "react-inlinesvg";

import { useProcessogramLogic } from "./logic";
import Loader from "react-loader-spinner";
import { ThemeColors } from "theme/globalStyle";
import { useBeforeStart } from "./hooks/useBeforeStart";

const ProcessogramSVG = React.forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG innerRef={ref} {...props} />
));

type Props = {
  src: string;
  open: boolean;
  onClose: () => void;
};

export const NewProcessogram = ({ src, open, onClose }: Props) => {
  const {
    setSvgElement,
    svgElement,
    focusedElementId,
    onTransition,
    loadingOptimization,
    start,
    stop,
  } = useProcessogramLogic({
    enableBruteOptimization: false,
    onClose,
  });

  const { optimize, restore } = useBeforeStart({
    svgElement,
    updateSvgElement: setSvgElement,
  });

  useEffect(() => {
    if (!svgElement) return;

    const run = async () => {
      if (!open) {
        optimize();
        stop();
      } else {
        await restore();
        start();
      }
    };

    run();
  }, [open, optimize, restore, svgElement]);

  return (
    <>
      <SvgContainer
        style={{
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <ProcessogramSVG
          ref={setSvgElement}
          src={src}
          className={`${focusedElementId} ${
            onTransition ? "onTransition" : ""
          }`}
        />
      </SvgContainer>
      {loadingOptimization && (
        <LoadingBackdrop>
          {" "}
          <Loader type="Oval" color={ThemeColors.white} />
        </LoadingBackdrop>
      )}
    </>
  );
};

const LoadingBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SvgContainer = styled.div`
  width: 100%;
  height: 100%;
  > svg {
    height: auto;
    overflow: visible;
    margin-inline: auto;
    opacity: 1;
    display: block;
    * {
      transition: opacity 0.25s ease-in-out, filter 0.25s ease-in-out;
    }
    max-height: 60vh;
    &.onTransition {
      pointer-events: none;
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

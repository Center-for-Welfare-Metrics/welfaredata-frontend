import React from "react";
import { styled } from "styled-components";

import { useProcessogramLogic } from "./logic";
import Loader from "react-loader-spinner";
import { ThemeColors } from "theme/globalStyle";
import { SvgRenderer } from "@/components/processograms/SvgRenderer";

type Props = {
  src: string;
  enableBruteOptimization?: boolean;
  onClose: () => void;
};

export const ProcessogramComplete = ({
  src,
  onClose,
  enableBruteOptimization,
}: Props) => {
  const { setSvgElement, focusedElementId, loadingOptimization } =
    useProcessogramLogic({
      onClose,
      path: src,
      enableBruteOptimization,
    });

  return (
    <>
      <SvgContainer>
        <SvgRenderer
          ref={setSvgElement}
          src={src}
          className={`${focusedElementId}`}
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

    [id*="--"] {
      cursor: pointer;
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

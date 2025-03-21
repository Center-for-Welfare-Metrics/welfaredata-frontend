import React from "react";
import { styled } from "styled-components";

import { useProcessogramLogic } from "./logic";
import Loader from "react-loader-spinner";
import { ThemeColors } from "theme/globalStyle";
import { SvgRenderer } from "@/components/processograms/SvgRenderer";
import { Portal } from "@material-ui/core";

type Props = {
  src: string;
  onClose: () => void;
  enableBruteOptimization?: boolean;
  maxHeight?: string;
};

export const ProcessogramComplete = ({
  src,
  onClose,
  enableBruteOptimization,
  maxHeight,
}: Props) => {
  const { setSvgElement, focusedElementId, loadingOptimization } =
    useProcessogramLogic({
      onClose,
      path: src,
      enableBruteOptimization,
    });

  return (
    <>
      {/* <SvgContainer> */}
      <SvgRenderer
        ref={setSvgElement}
        src={src}
        className={`${focusedElementId}`}
        style={{
          maxHeight: maxHeight,
          overflow: "visible",
        }}
      />
      {/* </SvgContainer> */}
      <Portal>
        {loadingOptimization && (
          <LoadingBackdrop>
            {" "}
            <Loader type="Oval" color={ThemeColors.white} />
          </LoadingBackdrop>
        )}
      </Portal>
    </>
  );
};

const LoadingBackdrop = styled.div`
  position: fixed;
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
  /* width: 100%;
  height: 100%; */

  /* > svg {[id*="--"] {
      cursor: pointer;
    }
    overflow: visible;
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
  } */
`;

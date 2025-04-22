import React from "react";
import { styled } from "styled-components";

import { useProcessogramLogic } from "./logic";
import Loader from "react-loader-spinner";
import { ThemeColors } from "theme/globalStyle";
import { SvgRenderer } from "@/components/processograms/SvgRenderer";
import { Portal } from "@mui/material";

type Props = {
  src: string;
  onClose: () => void;
  onChange: (id: string) => void;
  rasterImages: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
  enableBruteOptimization?: boolean;
  maxHeight?: string;
};

export const ProcessogramComplete = ({
  src,
  onClose,
  onChange,
  rasterImages,
  enableBruteOptimization,
  maxHeight,
}: Props) => {
  const { setSvgElement, loadingOptimization, onMouseMove, onMouseLeave } =
    useProcessogramLogic({
      onClose,
      path: src,
      enableBruteOptimization,
      onChange,
      rasterImages,
    });

  return (
    <>
      <SvgRenderer
        innerRef={setSvgElement}
        src={src}
        style={{
          maxHeight: maxHeight,
          overflow: "visible",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
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

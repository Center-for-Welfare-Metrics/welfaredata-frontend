import React from "react";
import { styled } from "styled-components";

import { useProcessogramLogic } from "./logic";
import { ClipLoader } from "react-spinners";
import { ThemeColors } from "theme/globalStyle";
import { SvgRenderer } from "@/components/processograms/SvgRenderer";
import { Portal } from "@mui/material";
import { Hierarchy } from "types/element-data";

type Props = {
  src: string;
  onClose: () => void;
  onChange: (id: string, hierarchy: Hierarchy) => void;
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
            <ClipLoader color={ThemeColors.deep_blue} size={40} />
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

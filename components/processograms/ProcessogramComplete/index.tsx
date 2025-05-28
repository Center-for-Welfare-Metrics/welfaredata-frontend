import React, { RefObject } from "react";
import { styled } from "styled-components";

import { useProcessogramLogic } from "./logic";
import { ClipLoader } from "react-spinners";
import { ThemeColors } from "theme/globalStyle";
import { SvgRenderer } from "@/components/processograms/SvgRenderer";
import { Portal } from "@mui/material";
import { ProcessogramHierarchy } from "types/processogram";
import { EventBusHandler } from "./types";

type Props = {
  src: string;
  onClose: () => void;
  onChange: (id: string, hierarchy: ProcessogramHierarchy[]) => void;
  rasterImages:
    | {
        [key: string]: {
          src: string;
          width: number;
          height: number;
          x: number;
          y: number;
        };
      }
    | undefined;
  eventBusHandler: EventBusHandler;
  startFromSpecie: boolean;
  isActive: boolean;
  theme: "dark" | "light";
  enableBruteOptimization?: boolean;
  maxHeight?: string;
  base64ImagesRef?: RefObject<Map<string, string>>;
  disableHover?: boolean;
};

export const ProcessogramComplete = ({
  src,
  onClose,
  onChange,
  rasterImages,
  startFromSpecie,
  enableBruteOptimization,
  maxHeight,
  eventBusHandler,
  base64ImagesRef,
  isActive,
  theme,
  disableHover,
}: Props) => {
  const { updateSvgElement, loadingOptimization, onMouseMove, onMouseLeave } =
    useProcessogramLogic({
      onClose,
      enableBruteOptimization,
      onChange,
      rasterImages,
      startFromSpecie,
      eventBusHandler,
      base64ImagesRef,
      isActive,
      theme,
      disableHover,
    });

  return (
    <>
      <SvgRenderer
        innerRef={updateSvgElement}
        src={src}
        style={{
          maxHeight: maxHeight,
          overflow: "visible",
          backgroundColor: theme === "light" ? ThemeColors.white : undefined,
        }}
        onMouseMove={isActive ? onMouseMove : undefined}
        onMouseLeave={isActive ? onMouseLeave : undefined}
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

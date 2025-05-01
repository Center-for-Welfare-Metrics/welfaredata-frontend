import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ProcessogramStarter } from "./components/ProcessogramStarter";
import { ProcessogramComplete } from "./components/ProcessogramComplete";
import { gsap } from "gsap";
import { ANIMATION_DURATION, ANIMATION_EASE } from "../../consts";
import { Processogram, ProcessogramHierarchy } from "types/processogram";

type ProcessogramComponentProps = {
  element: Processogram;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onClose: () => void;
  onChange: (id: string, hierarchy: ProcessogramHierarchy[]) => void;
  onCloseAnimationEnded: () => void;
  waitingForClose: boolean;
  isOver: boolean;
  over: string | null;
  isActive: boolean;
  active: string | null;
  enabledBruteOptimization?: boolean;
};

type BBox = {
  top: number;
  topWithScroll: number;
  left: number;
  width: number;
  height: number;
};

export const ProcessogramLoader = ({
  element,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onClose,
  onChange,
  onCloseAnimationEnded,
  waitingForClose,
  isOver,
  over,
  isActive,
  active,
  enabledBruteOptimization,
}: ProcessogramComponentProps) => {
  // Element refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  // Variables refs
  const initialized = useRef(false);

  // State
  const [renderOptimized, setRenderOptimized] = useState(true);
  const [BBox, setBBox] = useState<BBox | null>(null);

  const anotherIsActive = useMemo(() => {
    if (!active) return false;

    return active !== element._id;
  }, [active, element._id]);

  const activeStyle = useMemo((): CSSProperties => {
    if (!!active) {
      if (isActive)
        return {
          cursor: "default",
        };

      return {
        opacity: 0,
        pointerEvents: "none",
      };
    }

    if (waitingForClose) {
      return {
        pointerEvents: "none",
      };
    }

    return {};
  }, [isActive, active, waitingForClose]);

  const overStyle = useMemo((): CSSProperties => {
    if (!over) return {};

    if (isOver) return {};

    return {
      filter: "brightness(0.5)",
    };
  }, [isOver, over]);

  useEffect(() => {
    const onInitialized = () => {
      if (initialized.current) return;
      if (!containerRef.current) return;
      if (!svgContainerRef.current) return;

      const clientRect = containerRef.current.getBoundingClientRect();

      const { top, left, width, height } = clientRect;

      const topWithScroll = top + window.scrollY;

      setBBox({ top, topWithScroll, left, width, height });

      gsap.set(svgContainerRef.current, {
        position: "absolute",
        width,
        height,
        top: topWithScroll,
        left,
        translateX: 0,
        translateY: 0,
        onComplete: () => {
          gsap.set(document.body, {
            overflow: "hidden",
            onComplete: () => {
              gsap.fromTo(
                svgContainerRef.current,
                {
                  position: "fixed",
                  top,
                  left,
                  duration: 0,
                },
                {
                  top: "50%",
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  paddingLeft: 400,
                  duration: ANIMATION_DURATION,
                  ease: ANIMATION_EASE,
                  onComplete: () => {
                    setRenderOptimized(false);
                    initialized.current = true;
                  },
                }
              );
            },
          });
        },
      });
    };

    const onUninitialized = () => {
      if (!initialized.current) return;

      if (!BBox) return;

      gsap.to(svgContainerRef.current, {
        position: "fixed",
        top: BBox.top,
        left: BBox.left,
        translateX: 0,
        translateY: 0,
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        paddingLeft: 0,
        onComplete: () => {
          gsap.set(svgContainerRef.current, {
            top: BBox.topWithScroll,
            left: BBox.left,
            onComplete: () => {
              gsap.set(svgContainerRef.current, {
                position: "relative",
                width: "100%",
                height: "100%",
                top: "unset",
                left: "unset",
                onComplete: () => {
                  setBBox(null);
                  setRenderOptimized(true);
                  initialized.current = false;
                  gsap.set(document.body, {
                    overflow: "auto",
                  });
                  onCloseAnimationEnded();
                },
              });
            },
          });
        },
      });
    };

    if (!isActive) {
      onUninitialized();
      return;
    }
    if (!containerRef.current) return;

    onInitialized();
  }, [isActive]);

  return (
    <ProcessogramContainer
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={anotherIsActive ? undefined : onClick}
      style={activeStyle}
    >
      <SvgContainer ref={svgContainerRef} style={overStyle}>
        {renderOptimized ? (
          <ProcessogramStarter
            maxHeight="90vh"
            src={element.raster_images[element.identifier]?.src}
          />
        ) : (
          <ProcessogramComplete
            src={element.svg_url}
            onClose={onClose}
            onChange={onChange}
            enableBruteOptimization={enabledBruteOptimization}
            rasterImages={element.raster_images}
            maxHeight="90vh"
          />
        )}
      </SvgContainer>
      {BBox && (
        <FakeBoxStyled
          id="fake-box"
          style={{
            width: BBox.width,
            height: BBox.height,
            pointerEvents: "none",
          }}
        />
      )}
    </ProcessogramContainer>
  );
};

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: filter 500ms;
`;

const FakeBoxStyled = styled.div``;

const ProcessogramContainer = styled.div`
  width: 100%;
  height: fit-content;
  transition:
    filter 500ms,
    opacity 500ms;
  cursor: pointer;
`;

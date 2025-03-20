import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ProcessogramStarter } from "./components/ProcessogramStarter";
import { ProcessogramComplete } from "./components/ProcessogramComplete";
import { gsap } from "gsap";

type ProcessogramComponentProps = {
  path: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onClose: () => void;
  isOver: boolean;
  over: string | null;
  isActive: boolean;
  active: string | null;
};

type BBox = {
  top: number;
  topWithScroll: number;
  left: number;
  width: number;
  height: number;
};

const baseUrl = "assets/svg/zoo/";

export const ProcessogramLoader = ({
  path,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onClose,
  isOver,
  over,
  isActive,
  active,
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

    return active !== path;
  }, [active, path]);

  const style = useMemo((): CSSProperties => {
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

    if (!over) return undefined;

    if (isOver) return undefined;

    return { filter: "brightness(0.5)" };
  }, [isOver, over, isActive, active]);

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
                  duration: 0.5,
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
        duration: 0.5,
        onComplete: () => {
          setRenderOptimized(true);
          initialized.current = false;
          gsap.set(document.body, {
            overflow: "auto",
            onComplete: () => {
              gsap.set(svgContainerRef.current, {
                position: "absolute",
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
                    },
                  });
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
      style={style}
    >
      <SvgContainer ref={svgContainerRef}>
        {renderOptimized ? (
          <ProcessogramStarter src={baseUrl + path} maxHeight="50vh" />
        ) : (
          <ProcessogramComplete src={baseUrl + path} onClose={onClose} />
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
`;

const FakeBoxStyled = styled.div``;

const ProcessogramContainer = styled.div`
  width: 100%;
  height: fit-content;
  transition: filter 500ms, opacity 500ms;
  cursor: pointer;
`;

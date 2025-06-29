import {
  CSSProperties,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
// import { ProcessogramStarter } from "../ProcessogramStarter";
import { ProcessogramComplete } from "../ProcessogramComplete";
import { gsap } from "gsap";
import {
  ANIMATION_DURATION,
  ANIMATION_EASE,
} from "../ProcessogramsList/consts";
import { Processogram, ProcessogramHierarchy } from "types/processogram";
import { EventBusHandler } from "../ProcessogramComplete/types";
import { ThemeColors } from "theme/globalStyle";
import { useTheme } from "next-themes";

function calcularTopCentralizado(
  containerEl: HTMLElement | null,
  filhoEl: HTMLElement | null
): number {
  if (!containerEl || !filhoEl) return 0;

  const scrollTop: number = containerEl.scrollTop;
  const containerHeight: number = containerEl.clientHeight;
  const filhoHeight: number = filhoEl.offsetHeight;

  const top: number = scrollTop + containerHeight / 2 - filhoHeight / 2;
  return top;
}

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
  eventBusHandler: EventBusHandler;
  listContainerRef: RefObject<HTMLDivElement | null>;
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
  eventBusHandler,
  listContainerRef,
  enabledBruteOptimization,
}: ProcessogramComponentProps) => {
  // Element refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const base64ImagesRef = useRef<Map<string, string>>(
    new Map<string, string>()
  );

  const { resolvedTheme } = useTheme();

  // Variables refs
  const initialized = useRef(false);

  // State
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
      if (!listContainerRef.current) return;

      const clientRect = containerRef.current.getBoundingClientRect();

      const { top, left, width, height } = clientRect;

      const topWithScroll = top + listContainerRef.current?.scrollTop;

      setBBox({ top, topWithScroll, left, width, height });

      const centerTop = calcularTopCentralizado(
        listContainerRef.current,
        svgContainerRef.current
      );
      gsap.set(svgContainerRef.current, {
        position: "absolute",
        width: "calc(100% - 4rem)",
        top: topWithScroll,
        translateY: 0,
        onComplete: () => {
          gsap.set(listContainerRef.current, {
            overflow: "hidden",
            onComplete: () => {
              gsap.to(svgContainerRef.current, {
                top: centerTop,
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASE,
                onComplete: () => {
                  gsap.set(svgContainerRef.current, {
                    position: "fixed",
                    top: "50%",
                    translateY: "-50%",
                    width: "calc(100% - 464px)",
                  });
                  initialized.current = true;
                },
              });
            },
          });
        },
      });
    };

    const onUninitialized = () => {
      if (!initialized.current) return;

      if (!BBox) return;

      gsap.to(svgContainerRef.current, {
        top: BBox.topWithScroll,
        duration: ANIMATION_DURATION,
        translateY: 0,
        ease: ANIMATION_EASE,
        onComplete: () => {
          gsap.set(svgContainerRef.current, {
            top: "auto",
            position: "relative",
            width: "100%",
            onComplete: () => {
              setBBox(null);
              initialized.current = false;
              gsap.set(listContainerRef.current, {
                overflow: "auto",
              });
              onCloseAnimationEnded();
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

  useEffect(() => {
    const fetchBase64Images = async (rasterImages: {
      [key: string]: { src: string };
    }) => {
      const promises = Object.entries(rasterImages).map(
        async ([key, value]) => {
          const response = await fetch(value.src, {
            method: "GET",
            headers: { "Cache-Control": "no-cache" },
          });
          const blob = await response.blob();
          return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result as string;
              base64ImagesRef.current.set(key, base64data ?? value.src);
              resolve();
            };
          });
        }
      );

      await Promise.all(promises);
    };
    if (element.raster_images) {
      fetchBase64Images(element.raster_images);
    }
  }, [element]);

  const getSvgUrl = () => {
    if (resolvedTheme === "dark") {
      return element.svg_url_dark || element.svg_url_light;
    } else {
      return element.svg_url_light || element.svg_url_dark;
    }
  };

  return (
    <ProcessogramContainer
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={anotherIsActive ? undefined : onClick}
      style={activeStyle}
      noPointerEvents={!!active && !isActive}
    >
      <SvgContainer ref={svgContainerRef} style={overStyle}>
        <ProcessogramComplete
          src={element.svg_url_dark}
          onClose={onClose}
          onChange={onChange}
          enableBruteOptimization={enabledBruteOptimization}
          startFromSpecie={true}
          rasterImages={element.raster_images}
          eventBusHandler={eventBusHandler}
          base64ImagesRef={base64ImagesRef}
          isActive={isActive}
          maxHeight="90vh"
        />
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

type Props = {
  noPointerEvents: boolean;
};

const ProcessogramContainer = styled.div<Props>`
  width: 100%;
  height: fit-content;
  transition:
    filter 500ms,
    opacity 500ms;
  cursor: pointer;

  ${({ noPointerEvents }) =>
    noPointerEvents &&
    css`
      * {
        pointer-events: none !important;
      }
    `}
`;

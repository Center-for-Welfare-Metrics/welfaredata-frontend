import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { ProcessogramStarter } from "../ProcessogramStarter";
import { gsap } from "gsap";
import { Processogram } from "../Processogram";

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
  x: number;
  y: number;
  width: number;
  height: number;
};

const ProcessogramComponent = ({
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
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const svgContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Variables refs
  const initialized = React.useRef(false);

  // State
  const [renderOptimized, setRenderOptimized] = useState(true);
  const [BBox, setBBox] = useState<BBox | null>(null);

  const style = useMemo((): React.CSSProperties => {
    if (!!active) {
      if (isActive) return undefined;

      return {
        opacity: 0,
        pointerEvents: "none",
      };
    }

    if (!over) return undefined;

    if (isOver) return undefined;

    return { filter: "brightness(0.5)" };
  }, [isOver, over, isActive, active]);

  const svgBoxStyle = useMemo((): React.CSSProperties => {
    if (!BBox) return undefined;

    return {
      width: BBox.width,
      height: BBox.height,
      top: BBox.y,
      left: BBox.x,
      position: "fixed",
    };
  }, [BBox]);

  useEffect(() => {
    const onInitialized = () => {
      if (initialized.current) return;
      if (!containerRef.current) return;
      if (!svgContainerRef.current) return;

      const clientRect = containerRef.current.getBoundingClientRect();

      const { x, y, width, height } = clientRect;

      setBBox({ x, y, width, height });

      gsap.to(svgContainerRef.current, {
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        ease: "power1.inOut",
        duration: 0.5,
        onComplete: () => {
          setRenderOptimized(false);
          initialized.current = true;
        },
      });
    };

    const onUninitialized = () => {
      if (!initialized.current) return;

      if (!BBox) return;

      gsap.to(svgContainerRef.current, {
        top: BBox.y,
        left: BBox.x,
        width: BBox.width,
        height: BBox.height,
        translateX: 0,
        translateY: 0,
        ease: "power1.inOut",
        duration: 0.5,
        onComplete: () => {
          setBBox(null);
          setRenderOptimized(true);
          initialized.current = false;
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
      onClick={onClick}
      style={style}
    >
      <SvgContainer style={svgBoxStyle} ref={svgContainerRef}>
        {renderOptimized ? (
          <ProcessogramStarter src={baseUrl + path} />
        ) : (
          <Processogram src={baseUrl + path} onClose={onClose} />
        )}
      </SvgContainer>
      {BBox && (
        <FakeBoxStyled
          id="fake-box"
          style={{
            width: BBox.width,
            height: BBox.height,
          }}
        />
      )}
    </ProcessogramContainer>
  );
};

const SvgContainer = styled.div``;

const FakeBoxStyled = styled.div``;

const ProcessogramContainer = styled.div`
  width: 100%;
  height: fit-content;
  overflow: visible;
  transition: filter 500ms, opacity 500ms;
  cursor: pointer;
  position: relative;
`;

const baseUrl = "assets/svg/zoo/";

type Props = {
  paths: string[];
};

export const ProcessogramsList = ({ paths }: Props) => {
  const [over, setOver] = useState<string | null>(null);

  const [active, setActive] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setActive(path);
  };

  return (
    <Container>
      {paths.map((path) => (
        <ProcessogramComponent
          key={path}
          path={path}
          // Event handlers
          onMouseEnter={() => setOver(path)}
          onMouseLeave={() => setOver(null)}
          onClick={() => handleClick(path)}
          onClose={() => setActive(null)}
          // State
          isOver={over === path}
          over={over}
          isActive={active === path}
          active={active}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem;
  height: 100%;
  gap: 5rem;
`;

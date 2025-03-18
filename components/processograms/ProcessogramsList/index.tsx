import { useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { NewProcessogram } from "../Processogram";

type ProcessogramComponentProps = {
  path: string;
  handleOpen: (url: string) => void;
  isOpen: boolean;
  someIsActive: boolean;
  handleClose: () => void;
  onMouseEnter: (url: string) => void;
  onMouseLeave: () => void;
  style: React.CSSProperties;
};

const ProcessogramComponent = ({
  path,
  isOpen,
  someIsActive,
  style,
  handleClose,
  handleOpen,
  onMouseEnter,
  onMouseLeave,
}: ProcessogramComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const wrapperStyle = useMemo((): React.CSSProperties | undefined => {
    if (isOpen) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: containerRef.current?.clientWidth,
        height: containerRef.current?.clientHeight,
        zIndex: 1000,
      };
    }

    if (someIsActive) {
      return {
        opacity: "0",
        pointerEvents: "none",
      };
    }

    return undefined;
  }, [isOpen, someIsActive]);

  return (
    <ProcessogramContainer
      ref={containerRef}
      onClick={() => handleOpen(path)}
      onMouseEnter={() => onMouseEnter(path)}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <SvgWrapper style={wrapperStyle}>
        <NewProcessogram
          src={baseUrl + path}
          open={isOpen}
          onClose={handleClose}
        />
      </SvgWrapper>
      <div
        style={{
          position: isOpen ? "relative" : "absolute",
          width: isOpen ? containerRef.current?.clientWidth : "100%",
          height: isOpen ? containerRef.current?.clientHeight : "100%",
          top: 0,
          left: 0,
          pointerEvents: "none",
          transition: "filter 500ms",
          filter: isOpen ? "brightness(0.5)" : "none",
        }}
      />
    </ProcessogramContainer>
  );
};

const SvgWrapper = styled.div``;

const ProcessogramContainer = styled.div`
  width: 100%;
  height: fit-content;
  overflow: visible;
  transition: filter 500ms;
  cursor: pointer;
  position: relative;
`;

const baseUrl = "assets/svg/zoo/";

type Props = {
  paths: string[];
};

export const ProcessogramsList = ({ paths }: Props) => {
  const [currentOpen, setCurrentOpen] = useState<string | null>(null);

  const [hovered, setHovered] = useState<string | null>(null);

  const handleOpen = (url: string) => {
    if (!!currentOpen) return;

    setHovered(null);
    setCurrentOpen(url);
  };

  const handleClose = () => {
    setCurrentOpen(null);
  };

  const onMouseEnter = (url: string) => {
    if (!!currentOpen) return;

    setHovered(url);
  };

  const onMouseLeave = () => {
    if (!!currentOpen) return;

    setHovered(null);
  };

  const getFilter = (path: string) => {
    if (!hovered) return undefined;

    if (hovered !== path) return "brightness(0.5)";

    return undefined;
  };

  return (
    <Container>
      {paths.map((path) => (
        <ProcessogramComponent
          key={path}
          path={path}
          handleOpen={handleOpen}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          handleClose={handleClose}
          isOpen={currentOpen === path}
          someIsActive={!!currentOpen}
          style={{
            filter: getFilter(path),
            pointerEvents: currentOpen ? "none" : "auto",
          }}
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

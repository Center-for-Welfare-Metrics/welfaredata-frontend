import React, { useState } from "react";
import { styled } from "styled-components";

import { ProcessogramLoader } from "./components/ProcessogramLoader";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  title: string;
  paths: string[];
};

export const ProcessogramsList = ({ title, paths }: Props) => {
  const [over, setOver] = useState<string | null>(null);

  const [active, setActive] = useState<string | null>(null);
  const [waitingForClose, setWaitingForClose] = useState(false);

  const handleClick = (path: string) => {
    setActive(path);
    setWaitingForClose(true);
  };

  const handleClose = () => {
    setWaitingForClose(false);
  };

  return (
    <Container>
      <TitleContainer
        style={!!active ? { opacity: 0, pointerEvents: "none" } : undefined}
      >
        <Title>{title}</Title>
        <Subtitle>
          (click on the components to zoom in/out the different levels)
        </Subtitle>
      </TitleContainer>
      {paths.map((path) => (
        <ProcessogramLoader
          key={path}
          path={path}
          // Event handlers
          onMouseEnter={() => setOver(path)}
          onMouseLeave={() => setOver(null)}
          onClick={() => handleClick(path)}
          onClose={() => setActive(null)}
          onCloseAnimationEnded={handleClose}
          waitingForClose={waitingForClose}
          // State
          isOver={over === path}
          over={over}
          isActive={active === path}
          active={active}
          enabledBruteOptimization={path.includes("chicken")}
        />
      ))}
    </Container>
  );
};

export const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: ${ThemeColors.blue};
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${ThemeColors.blue};
  font-weight: 500;
  @media (max-width: 800px) {
    font-size: 1em;
  }
`;

export const TitleContainer = styled.div`
  margin-top: 5rem;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  @media (max-width: 800px) {
    padding-inline: 1rem;
    margin-top: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-inline: 8rem;
  padding-bottom: 8rem;
  height: 100%;
  gap: 5rem;

  svg {
    [id*="--"] {
      cursor: pointer;
    }
  }

  @media (max-width: 800px) {
    padding-inline: 1rem;
    padding-bottom: 1rem;
    gap: 3rem;

    svg {
      shape-rendering: optimizeSpeed;
      text-rendering: optimizeSpeed;
    }
  }
`;

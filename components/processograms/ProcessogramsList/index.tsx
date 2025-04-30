import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";

import { ProcessogramLoader } from "./components/ProcessogramLoader";
import { ThemeColors } from "theme/globalStyle";
import { Element } from "types/elements";
import { Hierarchy } from "types/element-data";
import {
  getElementLevelFromId,
  getElementNameFromId,
} from "../utils/extractInfoFromId";
import { deslugify } from "@/utils/string";

type Props = {
  title: string;
  elements: Element[];
  onChange: (id: string | null, hierarchy: Hierarchy) => void;
  onSelect: (id: string | null, hierarchy: Hierarchy) => void;
};

export const ProcessogramsList = ({
  title,
  elements,
  onSelect,
  onChange: onChangeProps,
}: Props) => {
  const [over, setOver] = useState<string | null>(null);

  const [active, setActive] = useState<string | null>(null);
  const [waitingForClose, setWaitingForClose] = useState(false);

  const getHierarchyByIdentifier = useCallback((identifier: string) => {
    const elementName = getElementNameFromId(identifier);
    const readableName = deslugify(elementName);
    const levelName = getElementLevelFromId(identifier);

    return [
      {
        id: elementName,
        level: levelName,
        levelNumber: 0,
        name: readableName,
        rawId: identifier,
      },
    ];
  }, []);

  const handleClick = (id: string, identifier: string | null) => {
    setActive(id);
    if (!!identifier) {
      const hierarchy = getHierarchyByIdentifier(identifier);
      onSelect(id, hierarchy);
    } else {
      onSelect(id, []);
    }
    onChangeProps(null, []);
    setWaitingForClose(true);
  };

  const onClose = () => {
    setActive(null);
    onSelect(null, []);
  };

  const handleClose = () => {
    setWaitingForClose(false);
  };

  const handleOver = (id: string | null, identifier: string | null) => {
    setOver(id);

    if (!active) {
      if (!!identifier) {
        const hierarchy = getHierarchyByIdentifier(identifier);
        onChangeProps(identifier, hierarchy);
      } else {
        onChangeProps(null, []);
      }
    }
  };

  const onChange = (id: string, hierarchy: Hierarchy) => {
    onChangeProps(id, hierarchy);
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
      {elements.map((element) => (
        <ProcessogramLoader
          key={element._id}
          element={element}
          // Event handlers
          onMouseEnter={() => handleOver(element._id, element.identifier)}
          onMouseLeave={() => handleOver(null, null)}
          onChange={onChange}
          onClick={() => handleClick(element._id, element.identifier)}
          onClose={onClose}
          onCloseAnimationEnded={handleClose}
          waitingForClose={waitingForClose}
          // State
          isOver={over === element._id}
          over={over}
          isActive={active === element._id}
          active={active}
          enabledBruteOptimization={false}
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
  padding-inline: 2rem;
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

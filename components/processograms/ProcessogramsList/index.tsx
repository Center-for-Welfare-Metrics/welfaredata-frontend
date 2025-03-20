import React, { useState } from "react";
import { styled } from "styled-components";

import { ProcessogramLoader } from "./components/ProcessogramLoader";

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
        <ProcessogramLoader
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
  box-sizing: border-box;
  padding: 6rem;
  padding-block: 8rem;
  height: 100%;
  gap: 10rem;
`;

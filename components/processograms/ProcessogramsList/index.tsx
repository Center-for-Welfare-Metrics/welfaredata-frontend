import { useState } from "react";
import { styled } from "styled-components";
import { NewProcessogram } from "../Processogram";

export const ProcessogramsList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Container>
        <NewProcessogram
          src="/assets/svg/zoo/pig/enhanced intensive.svg"
          open={isOpen}
          onClose={console.log}
        />
      </Container>
    </>
  );
};

const Container = styled.div``;

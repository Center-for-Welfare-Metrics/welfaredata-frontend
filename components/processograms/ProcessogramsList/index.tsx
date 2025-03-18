import { useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { NewProcessogram } from "../Processogram";
import gsap from "gsap";

type ProcessogramComponentProps = {
  path: string;
};

const ProcessogramComponent = ({ path }: ProcessogramComponentProps) => {
  return (
    <ProcessogramContainer>
      {/* <SvgWrapper> */}
      <NewProcessogram src={baseUrl + path} />
      {/* </SvgWrapper> */}
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
  return (
    <Container>
      {paths.map((path) => (
        <ProcessogramComponent key={path} path={path} />
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

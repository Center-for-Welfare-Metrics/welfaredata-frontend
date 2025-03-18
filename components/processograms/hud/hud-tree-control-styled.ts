import { styled, keyframes } from "styled-components";

let fade = keyframes`
    0%{opacity:0}
    100%{opacity:1}
`;

export const TreeItem = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  transform-origin: top left;
  padding: 0 0.5rem 0.25rem 0.5rem;
  :first-child {
    padding: 0.5rem 0.5rem 0.25rem 0.5rem !important;
  }
  font-size: 1.2rem;
  width: fit-content;
  animation: ${fade} 500ms;
  line-height: 1.2rem;
  width: fit-content;
  cursor: pointer;
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 88;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.9) 10%,
    rgba(0, 0, 0, 0.8) 80%,
    rgba(0, 0, 0, 0.3) 95%,
    rgba(0, 0, 0, 0) 100%
  );
  min-height: 5rem;
`;

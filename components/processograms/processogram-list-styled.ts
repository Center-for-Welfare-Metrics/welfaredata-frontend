import { lighten, transparentize } from "polished";
import styled, { css } from "styled-components";

const scrollBar = (color, size = ".5rem") => css`
  ::-webkit-scrollbar {
    width: ${size};
    height: ${size};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors[color]};
    transition: background-color 500ms;
    border-radius: 2rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.colors[color])};
    transition: background-color 500ms;
  }
`;
export const OverlapingMaster = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: white;
`;

type SubContainerProps = {
  $menuOpen: boolean;
};

export const SubContainer = styled.div<SubContainerProps>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-block: auto;
  padding-bottom: ${({ $menuOpen }) => ($menuOpen ? "8rem" : "0")};
  transition: padding-bottom 500ms;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  height: 100%;
  width: 100%;
  opacity: 1;
  ${scrollBar("gray")}
`;

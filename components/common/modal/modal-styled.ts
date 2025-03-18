import styled from "styled-components";
import { transparentize, lighten } from "polished";
import { GetColorType } from "@/utils/theme";

type Props = {
  isOpen: boolean;
  overflowY: string;
  isDialog: boolean;
  type: any;
};

export const Container = styled.div<Props>`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  background-color: black;
  border: ${({ theme, type }) =>
    `${theme.borderSize.medium} solid ${GetColorType({ theme, type })}`};
  z-index: 498;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  color: white;
  transition: opacity 500ms;
  width: ${({ isDialog }) => (isDialog ? "fit-content" : "30rem")};
  border-radius: 1rem;
  max-height: 98%;
  overflow-y: ${({ overflowY }) => overflowY};
  ::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme, type }) => GetColorType({ theme, type })};
    transition: background-color 500ms;
    border-radius: 2rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme, type }) =>
      lighten(0.1, GetColorType({ theme, type }))};
    transition: background-color 500ms;
  }
`;

type FadedProps = {
  isOpen: boolean;
};

export const FadedModalBackground = styled.div<FadedProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => transparentize(0.3, theme.colors.black)};
  z-index: 497;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 500ms;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 0 2rem;
`;

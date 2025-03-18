import styled, { css, keyframes } from "styled-components";
import { darken, lighten } from "polished";
import { GetColorType } from "@/utils/theme";

export const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Options = styled.div`
  border-radius: 1rem;
`;
type Props = {
  selected: boolean;
};

export const Option = styled.div<Props>`
  padding: 0.5rem;
  cursor: pointer;
  :first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  :last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  background-color: ${({ theme, selected }) =>
    selected ? darken(0.1, theme.colors.red) : theme.colors.red};
  :hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.red)};
  }
  ${({ selected }) =>
    selected
      ? css`
          transform: scale(1.015);
        `
      : ""}
`;

export const Error = styled.div`
  color: ${({ theme }) => GetColorType({ theme, type: "danger" })};
  text-align: center;
`;

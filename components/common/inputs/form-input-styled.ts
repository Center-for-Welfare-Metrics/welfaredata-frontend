import { lighten, transparentize } from "polished";
import { styled, css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

export const Icon = styled.i`
  position: absolute;
  top: 2.5rem;
  left: 2rem;
  color: ${ThemeColors.yellow};
  font-size: 20px;
`;

type LabelProps = {
  $hasValue: boolean;
  $multiline: boolean;
};

export const Label = styled.label<LabelProps>`
  color: ${({ theme }) => transparentize(0.5, ThemeColors.blue)};
  position: absolute;
  transform: translateY(105%);
  ${({ theme }) => css`
    bottom: 0;
    z-index: auto;
    font-size: 12px;
    color: ${ThemeColors.blue};
  `}
`;
export const Error = styled.span`
  font-size: 12px;
  color: ${ThemeColors.red};
  white-space: pre-wrap;
  font-weight: bold;
`;

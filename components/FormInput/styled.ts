import { css, styled } from "styled-components";

import { ThemeColors } from "theme/globalStyle";

export const LabeledInput = styled.input`
  padding: 0.5rem 0 0.5rem 0;
  border: none;
  background-color: transparent;
  color: ${ThemeColors.white};
  border-bottom: 1px solid ${ThemeColors.grey_600};
  outline: none;
  &:disabled {
    cursor: not-allowed;
  }
  &:focus {
    border-bottom: 1px solid ${ThemeColors.white};
  }
  font-size: 14px;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

type LabelProps = {
  $hasValue: boolean;
  $multiline: boolean;
};

export const Label = styled.label<LabelProps>`
  color: ${ThemeColors.blue};
  position: absolute;
  transform: translateY(105%);
  ${css`
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

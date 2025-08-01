import { styled, css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import TextareaAutosize from "react-textarea-autosize";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

type LabelProps = {
  $hasValue: boolean;
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

export const CleanTextArea = styled(TextareaAutosize)`
  background-color: transparent;
  color: ${ThemeColors.white};
  border: none;
  outline: none;
  resize: none;
  text-indent: 0;
  font-family: Arial;

  font-size: 14px;

  border-bottom: 1px solid ${ThemeColors.grey_600};
  outline: none;
  &:disabled {
    cursor: not-allowed;
  }
  &:focus {
    border-bottom: 1px solid ${ThemeColors.white};
    ~ ${Label} {
      color: ${ThemeColors.white};
    }
  }
`;

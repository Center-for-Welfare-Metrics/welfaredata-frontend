import { lighten, transparentize } from "polished";
import { styled, css } from "styled-components";

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
  color: ${({ theme }) => theme.colors.yellow};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

type LabelProps = {
  $hasValue: boolean;
  $multiline: boolean;
};

export const Label = styled.label<LabelProps>`
  color: ${({ theme }) => transparentize(0.5, theme.colors.blue)};
  position: absolute;
  transform: translateY(105%);
  ${({ theme }) => css`
    bottom: 0;
    z-index: auto;
    font-size: ${theme.fontSize.small};
    color: ${({ theme }) => theme.colors.blue};
  `}
`;
export const Error = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.red};
  white-space: pre-wrap;
  text-align: center;
  font-weight: bold;
`;

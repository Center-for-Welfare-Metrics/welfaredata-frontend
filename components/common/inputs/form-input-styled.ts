import { lighten, transparentize } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 2rem 0 2rem 0;
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
  white-space: nowrap;
  ${({ theme }) => css`
    bottom: 0;
    transform: translateY(-50%);
    z-index: auto;
    font-size: ${theme.fontSize.small};
    color: ${({ theme }) => theme.colors.blue};
  `}/* ${({ $hasValue, $multiline }) =>
    $hasValue &&
    !$multiline &&
    css`
      transform: translateY(-150%);
    `}

    transition: transform 100ms linear; */
`;
export const Error = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.red};
  white-space: pre-wrap;
  text-align: center;
  font-weight: bold;
`;

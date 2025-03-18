import styled from "styled-components";

type Props = {
  warning?: boolean;
};

export const Title = styled.div<Props>`
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize.large};
  display: flex;
  align-items: center;
  svg {
    width: 1.5rem;
    margin-left: 0.5rem;
    cursor: pointer;
    path {
      fill: ${({ theme, warning }) =>
        warning ? theme.colors.yellow : theme.colors.blue} !important;
    }
  }
`;

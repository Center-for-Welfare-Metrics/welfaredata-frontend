import styled, { css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  $isCurrentRoute: boolean;
};

export const Name = styled.div<Props>`
  cursor: pointer;
  transition: color 500ms;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  &:hover {
    background-color: ${ThemeColors.grey_200};
  }

  ${({ $isCurrentRoute }) =>
    $isCurrentRoute
      ? css`
          color: ${ThemeColors.blue};
          text-decoration: underline;
        `
      : css`
          color: ${ThemeColors.blue};
        `}
`;

export const Childrens = styled.div`
  display: flex;
  flex-direction: column;
`;

type ChildrenProps = {
  $isCurrentRoute: boolean;
};

export const Children = styled.a<ChildrenProps>`
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  ${({ $isCurrentRoute }) =>
    $isCurrentRoute
      ? css`
          color: ${ThemeColors.blue};
          text-decoration: underline;
        `
      : css`
          color: ${ThemeColors.blue};
        `}

  &:hover {
    background-color: ${ThemeColors.grey_200};
  }
`;

export const Container = styled.div`
  position: relative;
`;

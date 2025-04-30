import styled, { css } from "styled-components";
import { lighten } from "polished";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  $isCurrentRoute: boolean;
};

export const Name = styled.div<Props>`
  cursor: pointer;
  transition: color 500ms;
  font-weight: bold;
  &:hover {
    transform: scale(1.1);
  }

  ${({ $isCurrentRoute }) =>
    $isCurrentRoute
      ? css`
          color: ${lighten(0.25, ThemeColors.blue)};
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
          color: ${lighten(0.25, ThemeColors.blue)};
          text-decoration: underline;
        `
      : css`
          color: ${ThemeColors.blue};
        `}

  &:hover {
    transform: scale(1.1);
  }
`;

export const Container = styled.div`
  position: relative;
`;

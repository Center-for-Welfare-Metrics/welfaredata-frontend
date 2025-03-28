import styled, { css } from "styled-components";
import { lighten } from "polished";

type Props = {
  $active: boolean;
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
          color: ${({ theme }) => lighten(0.25, theme.colors.blue)};
          text-decoration: underline;
        `
      : css`
          color: ${({ theme }) => theme.colors.blue};
        `}

  ${({ $active }) =>
    $active &&
    css`
      transform: scale(1.1);
    `}

    &:hover {
    transform: scale(1.1);
  }
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
          color: ${({ theme }) => lighten(0.25, theme.colors.blue)};
          text-decoration: underline;
        `
      : css`
          color: ${({ theme }) => theme.colors.blue};
        `}

  &:hover {
    transform: scale(1.1);
  }
`;

export const Container = styled.div`
  position: relative;
`;

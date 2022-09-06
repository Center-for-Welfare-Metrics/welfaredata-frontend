import { darken } from "polished";
import styled, { css, keyframes } from "styled-components";
import { tabOptions } from "./menu-tabs";

export const TabIcon = styled.div`
  margin-right: 1rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  svg {
    transition: width 500ms ease-in-out, height 500ms ease-in-out;
    ${({ state }) =>
      state === "full"
        ? css`
            width: 3rem;
            height: 3rem;
          `
        : css`
            width: 2rem;
            height: 2rem;
          `}
    margin:0 !important;
    path {
      fill: ${({ theme }) => theme.colors.blue};
      transition: fill 500ms;
    }
  }
  ${({ state, active }) =>
    state === "full"
      ? css`
          ${active
            ? css`
                filter: brightness(1);
              `
            : css`
                filter: brightness(0.5);
                :hover {
                  filter: brightness(0.8);
                }
              `}
        `
      : css`
          opacity: 0;
        `}
  transition:padding-bottom 500ms,filter 500ms,opacity 500ms;
  outline: none;
`;

export const TabIconSizeFix = styled.div`
  margin-right: 1rem;
  padding-bottom: 0.5rem;
  margin-top: 0.05rem;
  cursor: pointer;
  svg {
    transition: width 500ms, height 500ms, filter 500ms;
    ${({ state, active }) =>
      state === "full"
        ? css`
            width: 2.8rem;
            height: 2.7rem;
            ${active
              ? css`
                  filter: brightness(1);
                `
              : css`
                  filter: brightness(0.5);
                  :hover {
                    filter: brightness(0.8);
                  }
                `}
          `
        : css`
            width: 1.8rem;
            height: 1.8rem;

            filter: brightness(0.5);
            :hover {
              filter: brightness(0.8);
            }
          `}
  }
`;

export const TabIconsContainer = styled.div`
  display: flex;
  width: fit-content;
  height: ${({ state }) => (state === "minimized" ? "1.8rem" : "2.8rem")};
  transition: height 500ms;
`;

const anim = keyframes`
    from{
        height:0;
    }
    to{
        height:8rem;
    }
`;

export const Body = styled.div`
  margin-top: 0.5rem;
  overflow: auto;
  transition: height 500ms ease-in-out, margin-top 500ms ease-in-out,
    width 500ms ease-in-out;
  animation: ${anim} ease-in-out 1s;
`;

let body_state = {
  minimized: css`
    margin-top: 0;
    height: 0;
  `,
  full: css`
    margin-top: 0.5rem;
    height: 8rem;
    @media (min-width: 1200px) {
      height: 8rem;
    }
  `,
  hide: css`
    margin-top: 0;
    height: 0;
  `,
};

type ContainerProps = {
  $state: "minimized" | "full" | "hide";
  $tab: tabOptions;
};

export const Container = styled.div<ContainerProps>`
  ${Body} {
    ${({ $state }) => body_state[$state]}
    ${({ $tab }) =>
      $tab === "feedback" &&
      css`
        height: 25rem !important;
      `}
  }
`;

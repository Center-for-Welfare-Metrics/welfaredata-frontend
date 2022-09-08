import { darken } from "polished";
import styled, { css, keyframes } from "styled-components";
import { tabOptions } from "./menu-tabs";

type TabIconProps = {
  $state: "minimized" | "full" | "hide";
  $active: boolean;
};

export const TabIcon = styled.div<TabIconProps>`
  ${({ $active, $state }) => css`
    opacity: ${$state === "minimized" ? ($active ? 1 : 0) : $active ? 1 : 0.4};
  `}
  cursor:pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 500ms;
`;

export const TabIconsContainer = styled.div`
  display: flex;
  width: fit-content;
  height: ${({ state }) => (state === "minimized" ? "1.8rem" : "2.8rem")};
  transition: height 500ms;
  gap: 1rem;
  margin-bottom: 0.5rem;
  @media (max-width: 800px) {
    margin-bottom: 0rem;
  }
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

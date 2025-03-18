import { styled, css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: ${ThemeColors.blue};
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${ThemeColors.blue};
  font-weight: 500;
  @media (max-width: 800px) {
    font-size: 1em;
  }
`;

type TitleContainerProps = {
  $visible: boolean;
};

export const TitleContainer = styled.div<TitleContainerProps>`
  margin-top: 5rem;
  text-align: center;
  ${({ $visible }) =>
    !$visible &&
    css`
      opacity: 0;
    `}
  transition: opacity 0.5s ease-in-out;
  @media (max-width: 800px) {
    padding-inline: 1rem;
  }
`;

export const CreditsContainer = styled.div<TitleContainerProps>`
  margin-bottom: 6rem;
  ${({ $visible }) =>
    !$visible &&
    css`
      opacity: 0;
    `}
  color: ${ThemeColors.blue};
  transition: opacity 0.5s ease-in-out;
  a {
    color: ${ThemeColors.blue};
  }
  p {
    margin-top: 0.5rem;
  }
  padding-left: 2rem;
  display: flex;
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }
`;

export const SvgContainer = styled.div`
  width: 100%;
  margin: 2.5rem 0;
  :first-child {
    margin-top: 5rem;
  }
  :last-child {
    margin-bottom: 5rem;
  }
  > svg {
    height: auto;
    overflow: visible;
    z-index: 77;
    margin-inline: auto;
    opacity: 1;
    display: block;
    min-height: 5rem;
    z-index: 77;
    max-height: 80vh;

    width: 80%;
  }
  @media (max-width: 800px) {
    > svg {
      shape-rendering: optimizeSpeed;
      text-rendering: optimizeSpeed;
    }
    :first-child {
      margin-top: 2rem;
    }
    :last-child {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 800px) {
    margin: 1rem 0;
  }
`;

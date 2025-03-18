import { styled, css } from "styled-components";
import SVG from "react-inlinesvg";
import Loader from "react-loader-spinner";
import { lighten } from "polished";
import { ThemeColors } from "theme/globalStyle";

export const CustomLoader = styled(Loader)``;

export const FetchingTitle = styled.div`
  color: ${({ theme }) => theme.colors.blue};
`;

export const FetchingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type TabProps = {
  active: boolean;
};

export const Tab = styled.div<TabProps>`
  color: ${({ theme, active }) =>
    !active ? ThemeColors.blue : ThemeColors.yellow};
  font-size: ${({ theme }) => theme.fontSize.normal1};
  cursor: pointer;
  transition: transform 500ms, color 500ms;
`;

type WarningProps = {
  warning: boolean;
};

export const Warning = styled(SVG)<WarningProps>`
  path {
    ${({ warning, theme }) =>
      warning &&
      css`
        fill: ${theme.colors.yellow} !important;
      `}
  }
`;

export const Tabs = styled.div`
  margin-left: 0.5rem;
  margin-top: 2rem;
`;

type Props = {
  load: boolean;
};

export const Body = styled.div<Props>`
  width: 70%;
  max-height: 50rem;
  position: ${({ load }) => (load ? "relative" : "static")};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

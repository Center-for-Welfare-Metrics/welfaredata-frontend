import styled from "styled-components";
import { transparentize, lighten, darken } from "polished";
import { GetColorType } from "@/utils/theme";
import SVG from "react-inlinesvg";

export const OptionText = styled.span`
  margin-left: 1rem;
`;

export const OptionIcon = styled(SVG)`
  width: 1.5rem;
`;

type Props = {
  type?: any;
};

export const Option = styled.div<Props>`
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.yellow};
  display: flex;
  align-items: center;
  :first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  :last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  ${OptionText} {
    color: ${({ theme, type }) => GetColorType({ theme, type })};
    transition: transform 500ms;
  }
  ${OptionIcon} {
    path,
    g {
      fill: ${({ theme, type }) => GetColorType({ theme, type })} !important;
    }
    transition: transform 500ms;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.black};
    ${OptionText} {
      color: ${({ theme, type }) =>
        lighten(0.2, GetColorType({ theme, type }))};
      transform: scale(1.1);
      transition: transform 500ms;
    }
    ${OptionIcon} {
      path,
      g {
        fill: ${({ theme, type }) =>
          lighten(0.2, GetColorType({ theme, type }))} !important;
      }
      transform: scale(1.1);
      transition: transform 500ms;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
`;

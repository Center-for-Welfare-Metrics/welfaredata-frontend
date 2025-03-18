import { styled } from "styled-components";
import SVG from "react-inlinesvg";

import Loader from "react-loader-spinner";

export const CustomLoader = styled(Loader)`
  margin-top: 0.5rem;
`;

export const Progress = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize.large};
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  align-self: flex-end;
`;

export const SvgIcon = styled(SVG)`
  path {
    fill: ${({ theme }) => theme.colors.blue} !important;
  }
  :hover {
    transition: transform 500ms;
  }
  transition: transform 500ms;
`;

export const Label = styled.label`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  :hover {
    ${SvgIcon} {
      transform: scale(1.2);
    }
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
`;

export const Container = styled.div``;

import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { Text } from "../Text";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const CtaCreate = ({ children, onClick }: Props) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.button`
  margin-top: 1rem;
  background-color: transparent;
  height: auto;
  width: 200px;
  border: 1px solid ${ThemeColors.deep_blue};
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease-in-out;
  border-radius: 4px;

  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.blue};
  }
`;

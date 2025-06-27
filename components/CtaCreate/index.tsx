import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { Text } from "../Text";

type Props = {
  onClick?: () => void;
  width: number;
  height: number;
  children: React.ReactNode;
};

export const CtaCreate = ({ children, onClick, width, height }: Props) => {
  return (
    <Container
      onClick={onClick}
      style={{
        width,
        height,
      }}
    >
      {children}
    </Container>
  );
};

const Container = styled.button`
  margin-top: 1rem;
  background-color: transparent;
  height: auto;
  border: 1px solid ${ThemeColors.grey_300};
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease-in-out;
  border-radius: 4px;

  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.grey_800};
  }
`;

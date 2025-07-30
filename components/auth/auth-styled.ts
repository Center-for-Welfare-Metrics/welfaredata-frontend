import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const Container = styled.div`
  background-color: ${ThemeColors.deep_blue};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

export const LinkTo = styled.span`
  margin-top: 0.5rem;
  color: ${ThemeColors.white};
  a {
    color: ${ThemeColors.yellow};
    transition: color 500ms;
    margin-left: 0.5rem;
  }
  a:hover {
    transition: color 500ms;
  }
`;

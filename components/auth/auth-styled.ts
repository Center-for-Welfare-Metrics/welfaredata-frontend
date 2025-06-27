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
  box-shadow: 15px 17px 20px -5px ${ThemeColors.deep_blue};
  padding: 1rem;
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
  color: white;
  a {
    color: ${ThemeColors.yellow};
    transition: color 500ms;
    margin-left: 0.5rem;
    cursor: not-allowed;
  }
  a:hover {
    transition: color 500ms;
  }
`;

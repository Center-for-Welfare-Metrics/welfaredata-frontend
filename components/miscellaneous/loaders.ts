import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

export const LoaderContainer = styled.div`
  color: ${ThemeColors.blue};
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

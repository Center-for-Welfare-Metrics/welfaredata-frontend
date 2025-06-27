import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { NAV_HEIGHT } from "./const";

export const Containter = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 90;
  justify-content: space-between;
  padding: 1rem 0 1rem 0;
  background-color: ${ThemeColors.black};
  box-sizing: border-box;
  height: ${NAV_HEIGHT}px;
`;

export const NavItems = styled.div`
  display: flex;
  gap: 4rem;
  padding-left: 4rem;
`;
export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

export const UserName = styled.div`
  color: ${ThemeColors.green};
`;

export const LogOut = styled.div`
  cursor: pointer;
  color: ${ThemeColors.blue};
  transition: all 500ms;
  :hover {
    color: ${ThemeColors.blue};
    transition: all 500ms;
  }
`;

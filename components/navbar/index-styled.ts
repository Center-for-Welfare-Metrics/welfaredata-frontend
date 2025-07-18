import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { NAV_HEIGHT } from "./const";

export const Containter = styled.div`
  position: sticky;
  top: 0;
  left: 0;

  width: 100%;
  height: ${NAV_HEIGHT}px;

  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  background-color: ${ThemeColors.black};
  border-bottom: 1px solid ${ThemeColors.grey_300};

  z-index: 90;
`;

export const NavItems = styled.div`
  display: flex;
  height: fit-content;
  gap: 4rem;
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

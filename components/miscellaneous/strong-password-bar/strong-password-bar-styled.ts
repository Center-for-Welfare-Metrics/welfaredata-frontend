import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

let baseLine = "0.05rem";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LineContainer = styled.div`
  display: flex;
  padding: 0 ${baseLine} 0 ${baseLine};
`;

type Props = {
  current: number;
  strength: number;
};

export const Line = styled.div<Props>`
  width: 2rem;
  height: 0.5rem;
  background-color: ${({ theme, current, strength }) => {
    let color = ThemeColors.red;
    if (strength > 1) {
      color = ThemeColors.green;
    }

    if (strength >= current) {
      color = ThemeColors.green;
    }
    return color;
  }};
  transition: background-color 1s;
  margin: 0 ${baseLine} 0 ${baseLine};
`;

type TextProps = {
  strength: number;
};

export const StrengthText = styled.span<TextProps>`
  color: ${({ theme, strength }) => {
    let color = ThemeColors.red;

    if (strength == 1) {
      color = ThemeColors.red;
    }

    if (strength > 1) {
      color = ThemeColors.green;
    }

    if (strength > 2) {
      color = ThemeColors.green;
    }
    return color;
  }};
  transition: color 1s;
`;

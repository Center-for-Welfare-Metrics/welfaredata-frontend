import styled from "styled-components";
import { darken, lighten } from "polished";

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
    let color = theme.colors.red;
    if (strength > 1) {
      color = darken(0.1, theme.colors.green);
    }

    if (strength >= current) {
      color = lighten(0.1, theme.colors.green);
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
    let color = theme.colors.red;

    if (strength == 1) {
      color = lighten(0.05, theme.colors.red);
    }

    if (strength > 1) {
      color = darken(0.1, theme.colors.green);
    }

    if (strength > 2) {
      color = lighten(0.1, theme.colors.green);
    }
    return color;
  }};
  transition: color 1s;
`;

import { createGlobalStyle, css } from "styled-components";

const darkColors = {
  blue: "#ffebff",
  deep_blue: "#0c1a27",
  yellow: "#FFE74C",
  white: "#FFFFFF",
  pink: "#730e28",
  red: "#9C3848",
  green: "#4DA167",
  black: "#000000",
  gray: "#919191",
};

const lightColors = {
  blue: "#2d3a4a",
  deep_blue: "#eaf1f8",
  yellow: "#FFD600",
  white: "#FFFFFF",
  pink: "#e57390",
  red: "#e57373",
  green: "#81c784",
  black: "#f5f5f5",
  gray: "#bdbdbd",
};

const themeVars = Object.keys(darkColors).reduce(
  (acc, key) => {
    acc[key as keyof typeof darkColors] = `var(--color-${key})`;
    return acc;
  },
  {} as Record<keyof typeof darkColors, string>
);

export const ThemeColors = themeVars;

export type ThemeColorsType = keyof typeof darkColors;

const scrollBar = (color: ThemeColorsType, size = ".5rem") => css`
  ::-webkit-scrollbar {
    width: ${size};
    height: ${size};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${ThemeColors[color]};
    transition: background-color 500ms;
    border-radius: 2rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${ThemeColors[color]};
    transition: background-color 500ms;
  }
`;

export const GlobalStyles = createGlobalStyle`
    #__next, html{
      height:100%;
    }

    *{
      margin:0;
    }

    html{
      background-color: var(--color-black);          
    }
    html,body,div,textarea{        
      ${scrollBar("gray")}
    }
    body{
      background-color: var(--color-black);        
      width:100%;
      height: 100%;
      font-family: 'Titillium Web', sans-serif;         
    }
    div,textarea{
      ${scrollBar("blue", ".25rem")}
    }
    textarea{
      font-family : inherit;
      font-size: 1em;
    }
    button {
      font-family : inherit;
      font-size: 1em;
    }

    /* --------------------- hack | gambiarra ---------------- */

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    -webkit-transition-delay: 9999s;
        transition-delay: 9999s;
    }

    /* --------------------- hack | gambiarra ---------------- */

    :root {
      /* light mode (default) */
      ${Object.entries(lightColors)
        .map(([key, value]) => `--color-${key}: ${value};`)
        .join("\n  ")}
    }

    [data-theme="dark"] {
      /* Dark mode overrides */
      ${Object.entries(darkColors)
        .map(([key, value]) => `--color-${key}: ${value};`)
        .join("\n  ")}
    }
`;

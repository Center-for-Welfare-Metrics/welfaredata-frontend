import { createGlobalStyle, css } from "styled-components";

const darkColors = {
  grey_50: "#1a1a1a",
  grey_100: "#2c2c2c",
  grey_200: "#3f3f3f",
  grey_300: "#525252",
  grey_400: "#666666",
  grey_500: "#7a7a7a",
  grey_600: "#8d8d8d",
  grey_700: "#a1a1a1",
  grey_800: "#b4b4b4",
  grey_900: "#c8c8c8",
  blue: "#ffebff",
  deep_blue: "#0c1a27",
  yellow: "#FFE74C",
  white: "#FFFFFF",
  pink: "#730e28",
  red: "#9C3848",
  green: "#4DA167",
  black: "#000000",
  gray: "#919191",
  fixedBackgroundWhite: "#f5f5f5",
  fixedBackgroundBlack: "#000000",
};

const lightColors = {
  grey_50: "#f5f5f5",
  grey_100: "#eeeeee",
  grey_200: "#e0e0e0",
  grey_300: "#bdbdbd",
  grey_400: "#9e9e9e",
  grey_500: "#757575",
  grey_600: "#616161",
  grey_700: "#424242",
  grey_800: "#212121",
  grey_900: "#000000",
  blue: "#2d3a4a",
  deep_blue: "#eaf1f8",
  yellow: "#FFD600",
  white: "#000000",
  pink: "#e57390",
  red: "#e57373",
  green: "#81c784",
  black: "#f5f5f5",
  gray: "#bdbdbd",
  fixedBackgroundWhite: "#f5f5f5",
  fixedBackgroundBlack: "#000000",
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

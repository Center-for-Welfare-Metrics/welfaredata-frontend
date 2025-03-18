import { lighten } from "polished";
import { createGlobalStyle, css } from "styled-components";

const scrollBar = (color, size = ".5rem") => css`
  ::-webkit-scrollbar {
    width: ${size};
    height: ${size};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors[color]};
    transition: background-color 500ms;
    border-radius: 2rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.colors[color])};
    transition: background-color 500ms;
  }
`;

export const GlobalStyles = createGlobalStyle`

    #__next{
        height:100%;
    }

    *{
        margin:0;
    }

    html{
        background-color: ${({ theme }) => theme.colors.black};          
    }
    html,body,div,textarea{        
        ${scrollBar("gray")}
    }
    body{
        background-color: ${({ theme }) => theme.colors.black};        
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
`;

export const ThemeColors = {
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

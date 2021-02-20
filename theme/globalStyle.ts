import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    html{
        scroll-behavior: smooth;
    }
    body{
        background-color: ${({theme}) => theme.colors.local_black};
        margin:0;
        width:100%;
        height: 100%;
        font-family: 'Titillium Web', sans-serif;
    }
    button {
        font-family : inherit;
        font-size: 1em;
    }
    textarea{
        font-family : inherit;
        font-size: 1em;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    -webkit-transition-delay: 9999s;
        transition-delay: 9999s;
    }
`
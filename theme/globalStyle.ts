import { lighten } from 'polished'
import  { createGlobalStyle,css } from 'styled-components'

const scrollBar = (color,size='.5rem') => css`
    ::-webkit-scrollbar {
        width: ${size};
        height: ${size};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors[color]};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors[color])};
        transition: background-color 500ms;
    }
`

export const GlobalStyles = createGlobalStyle`
    html{
        width:100%;
        height:100%;
    }
    html,body,div,textarea{        
        ${scrollBar('gray')}
    }
    body{
        background-color: ${({theme}) => theme.colors.black};
        margin:0;
        width:100%;
        height: 100%;
        font-family: 'Titillium Web', sans-serif;
        position:${({needFixedBody})=>needFixedBody?'fixed':'relative'};
    }
    div,textarea{
        ${scrollBar('blue','.25rem')}
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


    @media screen and (max-width:1300px){
        html{
            zoom:.75;
        }
    }
`
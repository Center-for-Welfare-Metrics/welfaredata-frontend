import { lighten } from 'polished'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body{
        background-color: ${({theme}) => theme.colors.local_black};
        margin:0;
        width:100%;
        height: 100%;
        font-family: 'Titillium Web', sans-serif;
        position:${({needFixedBody})=>needFixedBody?'fixed':'static'};
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
    html{
        div{
            ::-webkit-scrollbar {
            width: .25rem;
            height: .25rem;
            }
            ::-webkit-scrollbar-thumb {
                background-color: ${({theme})=>theme.colors.local_pink};
                transition: background-color 500ms;
                border-radius:2rem;
            }
            ::-webkit-scrollbar-thumb:hover{
                background-color: ${({theme})=> lighten(0.1,theme.colors.local_pink)};
                transition: background-color 500ms;
            }
        }
        ::-webkit-scrollbar {
            width: .5rem;
            height: .5rem;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${({theme})=>theme.colors.local_white};
            transition: background-color 500ms;
            border-radius:2rem;
        }
        ::-webkit-scrollbar-thumb:hover{
            background-color: ${({theme})=> lighten(0.1,theme.colors.local_white)};
            transition: background-color 500ms;
        }
    }
    @media screen and (max-width:1300px){
        html{
            zoom:.75;
        }
    }
`
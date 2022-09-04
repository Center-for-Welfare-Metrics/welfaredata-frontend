import styled , {css} from 'styled-components'
import {transparentize,lighten} from 'polished'
import Loader from "react-loader-spinner";


export const Container = styled.div`
    position:absolute;
    opacity:${({open})=>open?1:0}; 
    transition: opacity 500ms;
    width:${({type})=>type==='options'?'fit-content':'20rem'};
    border:${({theme})=>`${theme.borderSize.medium} solid ${theme.colors.blue}`};
    border-radius:1rem;
    background-color:${({theme})=>transparentize(0.3,theme.colors.black)};
    z-index:500;
    backdrop-filter:blur(5px);
    display: ${({open})=>open?'block':'none'};
`

export const FullBackground = styled.div`
    top:0;
    position:fixed;
    width:100%;
    height:100%;
    z-index:499;
    display: ${({open})=>open?'block':'none'};
`

export const Body = styled.div`
    height:25rem;        
    color:${({theme}) => theme.colors.white};
    overflow-y:auto;
    padding:0 .5rem 0 .5rem;
    margin:.25rem;
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.blue};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.blue)};
        transition: background-color 500ms;
    }
`

export const AttentionBody = styled(Body)`
    height:fit-content;
    min-height:unset;
`

export const CustomLoader = styled(Loader)`
    top:35%;
    left:50%;
    transform:translate(-50%,-50%); 
    position:absolute;
`


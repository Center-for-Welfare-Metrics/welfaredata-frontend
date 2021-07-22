import { lighten, transparentize } from 'polished'
import styled ,{css,keyframes} from 'styled-components'

let fade = keyframes`
    0%{opacity:0}
    100{opacity:1}
`

export const TreeItem = styled.div`
   color:${({theme}) => theme.colors.blue};   
   width: fit-content;
   ${({active}) => active?
   css`
        font-weight:bold;        
        cursor:default;
   `
    :
    css`
        :hover{
            transform: scale(1.05);
        }
        cursor: pointer;
    `    
    }
    animation:${fade} 500ms;
    line-height:1.2rem;
    background-color:${transparentize(0.3,'black')}
    /* @media (hover:none){
        ${({ishover}) => ishover && css`
            display:none;
        `}
    } */
`

export const Container = styled.div`        
    position:fixed;
    top:1.2rem;
    left:0rem;
    padding:.5rem;
    padding-top:.25rem;
    z-index:100;    
    /* background: #000000; */
    background: -webkit-radial-gradient(center, #000000, #05050500);
    background: -moz-radial-gradient(center, #000000, #05050500);
    background: radial-gradient(ellipse at center, #000000, #05050500);
`
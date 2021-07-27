import { lighten, transparentize } from 'polished'
import styled ,{css,keyframes} from 'styled-components'

let fade = keyframes`
    0%{opacity:0}
    100%{opacity:1}
`

export const TreeItem = styled.div`
   color:${({theme}) => theme.colors.blue};
   transform-origin: top left;   
   padding:0 .5rem .25rem .5rem;
   :first-child{
       padding:.5rem .5rem .25rem .5rem !important;
   }
   width: fit-content;
   ${({active}) => active?
   css`
        font-weight:bold;        
        cursor:default;
   `
    :
    css`
        cursor: pointer;
    `    
    }
    animation:${fade} 500ms;
    line-height:1.2rem;    
    width:100%;
`

export const Container = styled.div`        
    position:fixed;
    top:0rem;
    left:0rem;
    z-index:100;
    width:100%;
    background: linear-gradient(180deg, rgba(0,0,0,.9) 10%,rgba(0,0,0,0.8) 80%,rgba(0,0,0,0.3) 95%,rgba(0,0,0,0) 100%);    
    min-height:5rem;
`
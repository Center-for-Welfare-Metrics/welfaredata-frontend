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

    @media (hover:none){
        ${({ishover}) => ishover && css`
            display:none;
        `}
    }
`

export const Container = styled.div`        
    position:fixed;
    top:1.2rem;
    left:0rem;
    padding:.5rem;
    padding-top:.25rem;
    z-index:100;    
    background: linear-gradient(165deg,rgba(0,0,0,1) 10%,rgba(0,0,0,.9) 20%,rgba(0,0,0,.8) 30%,rgba(0,0,0,.7) 40%,rgba(0,0,0,.5) 50%,rgba(0,0,0,.4) 60%,rgba(0,0,0,.2) 70%,rgba(0,0,0,0) 80%,rgba(0,0,0,0) 90%,rgba(0,0,0,0) 100%);
`
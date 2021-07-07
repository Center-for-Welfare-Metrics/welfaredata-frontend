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
        text-decoration:underline;
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
`

export const Container = styled.div`        
    position:absolute;
    top:2rem;
    left:1rem;
    z-index:100;
    background-color: ${({theme}) => transparentize(0.3,theme.colors.black)};
    animation: ${fade} 500ms;
`
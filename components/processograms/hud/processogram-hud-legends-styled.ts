import { lighten, transparentize } from 'polished'
import styled ,{css} from 'styled-components'



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
    position:fixed;
    top:2rem;
    left:1rem;
    z-index:100;
    background-color: ${({theme}) => transparentize(0.3,theme.colors.black)};
`
import { transparentize } from 'polished'
import styled , {keyframes} from 'styled-components'

const anim = keyframes`
    from {transform:translateY(100%)}
    to {transform:translateY(0)}
`

export const Container = styled.div`
    position:absolute;
    bottom:0;    
    right:0;    
    width:100%;
    height:fit-content;
    background-color:${({theme}) => transparentize(0.4,theme.colors.black)};
    backdrop-filter:blur(2px);
    z-index:99;
    border-top-right-radius:1rem;
    border-top-left-radius:1rem;    
    border:3px solid ${({theme}) => theme.colors.blue};
    border-bottom:none;
    color:white;
    box-sizing: border-box; 
    padding:1rem;
    max-width:500px;
    animation: ${anim} 500ms;
`
import { transparentize } from 'polished'
import styled , {keyframes} from 'styled-components'

export const Title = styled.div`
    text-align: center;
`

export const Description = styled.div`    
    height:90%;     
    overflow:auto;
`

const anim = keyframes`
    0%{transform:translateY(100%);}
    100%{transform:translateY(85%);}
`

export const Container = styled.div`
    position:absolute;
    bottom:0;    
    right:0;
    transform:translateY(85%);
    width:100%;
    height:15rem;    
    background-color:${({theme}) => transparentize(0.4,theme.colors.black)};
    backdrop-filter:blur(2px);
    z-index:99;
    border-top-right-radius:1rem;
    border-top-left-radius:1rem;
    animation: ${anim} 500ms;    
    border:3px solid ${({theme}) => theme.colors.blue};
    border-bottom:none;
    color:white;
    box-sizing: border-box; 
    padding:1rem;
    max-width:500px;
`
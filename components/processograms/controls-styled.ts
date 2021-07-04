import styled, {css,keyframes} from 'styled-components'

let fade = keyframes`
    0%{opacity:0}
    100{opacity:1}
`

export const Arrow = styled.div`
    position:absolute;
    svg{
        path{
            fill:white !important;
        }        
        width:3rem; 
    }
    top:50%;
    animation: ${fade} 500ms;
    cursor: pointer;
    z-index:100;      
`

export const ToRight = styled(Arrow)`
    transform: translate(120%,-50%);
    right:0;
`

export const ToLeft = styled(Arrow)`
    transform: translate(-120%,-50%) rotate(180deg);
    left:0;
`

export const Container = styled.div`
    position:absolute;
`
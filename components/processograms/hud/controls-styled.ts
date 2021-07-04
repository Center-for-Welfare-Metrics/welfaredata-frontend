import styled from 'styled-components'



export const Arrow = styled.div`
    position:absolute;
    svg{
        path{
            fill:${({theme}) => theme.colors.blue} !important;
        }        
        width:3rem; 
        z-index:100;
    }
    top:50%;
    cursor: pointer;
    z-index:100;
    @media(max-width:800px){
        display:none;
    }      
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
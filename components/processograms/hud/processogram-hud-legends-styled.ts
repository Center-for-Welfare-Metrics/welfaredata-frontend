import { transparentize } from 'polished'
import styled from 'styled-components'




export const Title = styled.div`
    color:${({theme}) => theme.colors.blue};    
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    transform: translateY(-115%);
    background-color: ${({theme}) => transparentize(0.5,theme.colors.black)};

    @media(max-width:800px){
        transform: translateY(-100%);
    }
`
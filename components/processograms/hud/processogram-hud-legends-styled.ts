import { transparentize } from 'polished'
import styled from 'styled-components'




export const Title = styled.div`
    color:${({theme}) => theme.colors.blue};
    font-weight:bold;
    position:absolute;
    top:0;
    left:0;
    z-index:100;
    transform: translateY(-115%);
    background-color: ${({theme}) => transparentize(0.5,theme.colors.black)};
`
import { transparentize } from 'polished'
import styled from 'styled-components'

export const CommonTitle = styled.div`
    color:${({theme})=>theme.colors.blue};    
    position:fixed;
    padding:0 1rem 0 1rem;
    background-color:${({theme})=> transparentize(0.3,theme.colors.black) };
    backdrop-filter:blur(5px);
    border-radius:1rem;
    position:fixed;
    z-index:400;
`


export const GreatTitle = styled(CommonTitle)`
    font-size:${({theme})=>theme.fontSize.extraLarge};   
    top:3rem;
    left:50%;
    transform:translateX(-50%);
`

export const Title = styled(CommonTitle)`
    font-size:${({theme})=>theme.fontSize.large};         
    top:8rem;
`



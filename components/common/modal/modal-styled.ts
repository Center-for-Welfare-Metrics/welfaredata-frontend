import styled from 'styled-components'
import { transparentize } from 'polished'

export const Container = styled.div`
    position:absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color:black;
    border:${({theme})=>`${theme.borderSize.medium} solid ${theme.colors.local_blue}`};
    z-index:997;
    opacity:${({isOpen})=>isOpen?1:0};
    color:white;
    transition:opacity 1s;
    width:30rem;
    border-radius:1rem;
`

export const FadedModalBackground = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:${({theme})=> transparentize(0.3,theme.colors.local_black)};
    z-index:996;
    opacity:${({isOpen})=>isOpen?1:0};
    transition:opacity 1s;
`
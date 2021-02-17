import styled from 'styled-components'
import { transparentize } from 'polished'

export const Container = styled.div`
    border:2px solid ${({theme})=>theme.colors.local_red};
    background-color:black;
    width:30rem;
    height:30rem;
    position:absolute;
    z-index:997;
`

export const FadedModalBackground = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:${({theme})=> transparentize(0.6,theme.colors.local_black)};
    z-index:996;
`
import styled from 'styled-components'
import { transparentize,lighten } from 'polished'
import { GetColorType } from '@/utils/theme'

export const Container = styled.div`
    position:fixed;
    top:40%;
    left:50%;
    transform:translate(-50%,-40%);
    background-color:black;
    border:${({theme,type})=>`${theme.borderSize.medium} solid ${ GetColorType({theme,type})}`};
    z-index:997;
    opacity:${({isOpen})=>isOpen?1:0};
    color:white;
    transition:opacity 500ms;
    width:30rem;
    border-radius:1rem;
    max-height:98%;
    overflow-y:auto;
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.local_blue};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.local_blue)};
        transition: background-color 500ms;
    }
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
    transition:opacity 500ms;
`

export const ActionButtons = styled.div`
    display:flex;
    justify-content:space-between;
    padding:0 2rem 0 2rem;
`
import styled from 'styled-components'
import {transparentize,lighten} from 'polished'



export const Container = styled.div`
    position:absolute;
    opacity:0;
    width:20rem;
    border:${({theme})=>`${theme.borderSize.medium} solid ${theme.colors.local_pink}`};
    border-radius:1rem;
    background-color:${({theme})=>transparentize(0.20,theme.colors.local_black)};
    z-index:999;
`

export const FullBackground = styled.div`
    top:0;
    position:absolute;
    width:100%;
    height:100%;
    z-index:998;
`

export const Body = styled.div`
    height:25rem;
    color:${({theme}) => theme.colors.local_white};
    overflow-y:auto;
    padding:0 .5rem 0 .5rem;
    margin:.25rem;
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.local_pink};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.local_pink)};
        transition: background-color 500ms;
    }
`

export const AttentionBody = styled(Body)`
    height:fit-content;
`

export const Footer = styled.div`
    border-top:5px solid ${({theme})=>theme.colors.local_pink};
    display:flex;
    height:fit-content;
`


export const ButtonNavigator = styled.div`
    padding:.5rem .5rem 0 .5rem;
    border:none;
    cursor: pointer;
`


export const ButtonIcon = styled.img`
    width:100%;
    height:auto;
`
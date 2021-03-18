import styled from 'styled-components'
import {lighten} from 'polished'
import Loader from "react-loader-spinner"

export const Footer = styled.div`
    border-top:5px solid ${({theme})=>theme.colors.pink};
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

export const Description = styled.div`
    margin-top:.5rem;
`


export const Title = styled.div`
    text-align:center;
`

export const Body = styled.div`
    height:25rem;
    color:${({theme}) => theme.colors.white};
    overflow-y:auto;
    padding:0 .5rem 0 .5rem;
    margin:.25rem;
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.pink};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.pink)};
        transition: background-color 500ms;
    }
`
export const CustomLoader = styled(Loader)`
    top:35%;
    left:50%;
    transform:translate(-50%,-50%); 
    position:absolute;
`
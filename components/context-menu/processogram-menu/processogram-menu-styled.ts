import styled,{css} from 'styled-components'
import {lighten} from 'polished'
import Loader from "react-loader-spinner"
import ShareOutlined from '@material-ui/icons/ShareOutlined'

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    @media(max-width:800px){
        flex-direction:row;
        height:13.5rem;
    }
`

export const ShareIcon = styled(ShareOutlined)`
    position:absolute;
    right:.5rem;
    top:.5rem;
    color:${({theme})=>theme.colors.blue};
    cursor: pointer;
    @media(max-width:800px){
        right:3.5rem;
    }
`

export const Footer = styled.div`
    border-top:5px solid ${({theme})=>theme.colors.blue};
    display:flex;
    height:fit-content;
    @media(max-width:800px){
        flex-direction:column;
        justify-content:center;
        border:none;
        height:14rem;
    }
`


export const ButtonNavigator = styled.div`
    padding:.5rem .5rem 0 .5rem;
    border:none;
    cursor: pointer;
    @media(max-width:800px){
        padding:0;
    }
`


export const ButtonIcon = styled.img`
    width:100%;
    filter:${({active}) => active?`brightness(1.2)`:`brightness(1)`};
    height:auto;
    :hover{
        filter:brightness(1.2);
        transition:filter 500ms;
    }
    transition:filter 500ms;
    @media(max-width:800px){
        width:3rem;
        height:100%;
    }
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
        background-color: ${({theme})=>theme.colors.blue};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.blue)};
        transition: background-color 500ms;
    }
    @media(max-width:800px){
        height:13.5rem;
        width:100%;
        padding-bottom:.5rem;
    }
`
export const CustomLoader = styled(Loader)`
    top:35%;
    left:50%;
    transform:translate(-50%,-50%); 
    position:absolute;
`
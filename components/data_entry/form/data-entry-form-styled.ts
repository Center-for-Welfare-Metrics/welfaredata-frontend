import { transparentize } from 'polished';
import styled from 'styled-components'

import Loader from "react-loader-spinner";

export const CustomLoader = styled(Loader)`
    top:50%;
    left:50%;
    transform:translate(-50%,0); 
    position:absolute;
`

export const Tab = styled.div`
    color:${({theme,active}) => active?theme.colors.blue:transparentize(0.3,theme.colors.blue)};
    font-size:${({theme})=>theme.fontSize.large};
    transform: ${({active}) => active?'scale(1.2)':'scale(1)'};
    cursor: pointer;
    line-height:2rem;
    font-weight:bold;
    :hover{
        transform: scale(1.2);
        transition: transform 500ms, color 500ms;
    }
    transition: transform 500ms, color 500ms;
`


export const Tabs = styled.div`
    width:30%;
    margin-top:2rem;
`



export const Body = styled.div`
    width:70%;
    max-height:50rem;
    position:${({load})=>load?'relative':'static'};
`


export const Container = styled.div`
    display:flex;
`
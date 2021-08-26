import { transparentize } from 'polished';
import styled from 'styled-components'

import Loader from "react-loader-spinner";
import { lighten } from 'polished';

export const CustomLoader = styled(Loader)`
    
`

export const FetchingTitle = styled.div`
    color:${({theme}) => theme.colors.blue};
`

export const FetchingDiv = styled.div`        
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
`

export const Tab = styled.div`
    color:${({theme,active}) => !active?theme.colors.blue:lighten(0.3,theme.colors.blue)};
    font-size:${({theme})=>theme.fontSize.normal1};    
    cursor: pointer;    
    transition: transform 500ms, color 500ms;
`


export const Tabs = styled.div`
    /* width:30%; */
    margin-left:.5rem;
    margin-top:2rem;
`



export const Body = styled.div`
    width:70%;
    max-height:50rem;
    position:${({load})=>load?'relative':'static'};
`


export const Container = styled.div`
    display:flex;
    justify-content:center;
`
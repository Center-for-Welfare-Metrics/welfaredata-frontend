import { transparentize } from 'polished'
import styled , {keyframes} from 'styled-components'

import ShareOutlined from '@material-ui/icons/ShareOutlined'


export const Share = styled(ShareOutlined)`
    position:absolute;
    top:1rem;
    right:4rem;
    height:2rem;
    width:2rem;
    cursor:pointer;
    color:${({theme}) => theme.colors.blue} !important;
        
`

export const Minimize = styled.div`
    width:1.25rem;
    transition:height 500ms;
    height:${({state}) => state==='full'?'0rem':'1.25rem'};
    border:2px solid ${({theme}) => theme.colors.blue};
    border-radius:.25rem;
    position:absolute;
    top:1rem;
    right:1rem;
    cursor: pointer;
    svg{
        width:100%;
        height:100%;
        stroke:${({theme}) => theme.colors.blue};
    }
`



const anim = keyframes`
    0% {transform:translateY(100%)}
    100% {transform:translateY(0)}
`

export const Container = styled.div`
    position:absolute;
    bottom:0;    
    right:0;
    width:100%;
    height:fit-content;
    max-height:100vh;
    background-color:${({theme}) => transparentize(0.3,theme.colors.black)};
    backdrop-filter:blur(2px);
    z-index:99;
    border-top-right-radius:1rem;
    border-top-left-radius:1rem;    
    border:3px solid ${({theme}) => theme.colors.blue};
    border-bottom:none;
    color:white;
    box-sizing: border-box; 
    padding:1rem;
    max-width:500px;
    animation: ${anim} 500ms;
    animation-timing-function: ease-in-out;  
    cursor: ${({state}) => state==='full'?'unset':'pointer'};
`
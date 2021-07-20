import { lighten, transparentize } from 'polished'
import styled , {keyframes} from 'styled-components'

import ShareOutlined from '@material-ui/icons/ShareOutlined'

export const CopyTo = styled.div`
    position:absolute;
    top:1rem;
    right:4rem;
    height:2rem;
    width:2rem;
`


export const Share = styled(ShareOutlined)`
    color:${({theme}) => theme.colors.blue} !important;        
    cursor:pointer;
    :hover{
        color:${({theme}) => lighten(0.3,theme.colors.blue)} !important;
    }
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
    @media (hover){
        :hover{
            border:2px solid ${({theme}) => lighten(0.3,theme.colors.blue)};
            svg{
                stroke:${({theme}) => lighten(0.3,theme.colors.blue)};
            }              
        }
    }    
`

export const Container = styled.div`
    position:fixed;
    bottom:0;    
    right:0;
    width:100%;
    height:fit-content;
    max-height:100vh;
    background-color:${({theme}) => transparentize(0.2,theme.colors.black)};
    backdrop-filter:blur(2px);
    z-index:99;
    border-top-right-radius:1rem;
    border-top-left-radius:1rem;    
    border:2px solid ${({theme}) => theme.colors.blue};
    border-bottom:none;
    color:${(({theme}) => theme.colors.blue)};
    box-sizing: border-box; 
    padding:1rem;
    max-width:540px;
    cursor: ${({state}) => state==='full'?'unset':'pointer'};
`
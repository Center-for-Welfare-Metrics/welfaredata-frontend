import { lighten, transparentize } from 'polished'
import styled , {css} from 'styled-components'

import ShareOutlined from '@material-ui/icons/ShareOutlined'

export const CopyTo = styled.div`
    position:absolute;
    top:1rem;
    right:.5rem;
    height:2rem;
    width:2rem;
`


export const Share = styled(ShareOutlined)`
    color:${({theme}) => theme.colors.blue} !important;        
    cursor:pointer;
    transition:color 500ms !important;
    :hover{
        color:${({theme}) => lighten(0.3,theme.colors.blue)} !important;
    }
`

export const Minimize = styled.div`
    width:1.25rem;
    transition:height 500ms;    
    border-radius:.25rem;
    position:absolute;
    top:1rem;
    right:1rem;
    cursor: pointer;
    svg{
        transition:transform 500ms;
        transform-origin: center;
        ${({state}) => state==='minimized' && css`
            transform:rotate(180deg);
        `
        }
        width:100%;
        height:100%;
        path{
            transition:fill 500ms;
            fill:${({theme}) => theme.colors.blue};
        }
    }
    @media (hover){
        :hover{            
            svg{
                path{
                    fill:${({theme}) => lighten(0.3,theme.colors.blue)};
                }
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
    background: linear-gradient(360deg, rgba(0,0,0,.9) 10%,rgba(0,0,0,0.8) 80%,rgba(0,0,0,0.3) 95%,rgba(0,0,0,0) 100%);    
    z-index:99;
    border-top-right-radius:1rem;
    border-top-left-radius:1rem;
    border-bottom:none;
    color:${(({theme}) => theme.colors.blue)};
    box-sizing: border-box; 
    padding:1rem;    
    cursor: ${({state}) => state==='full'?'unset':'pointer'};
    ${({state}) => state==='full'?css`        
        cursor:unset;
    `:css`
        cursor:pointer;      
    `}
`
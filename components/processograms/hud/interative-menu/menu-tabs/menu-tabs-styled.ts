import { darken } from 'polished'
import styled, {css,keyframes} from 'styled-components'



export const TabIcon = styled.div`
    margin-right:1rem;
    padding-bottom:.5rem;
    cursor:pointer;
    svg{
        transition:width 500ms,height 500ms;
        ${({state}) => state==='full'?
            css`
                width:3rem;
                height:3rem;
            `
            :
            css`
                width:2rem;
                height:2rem;
            `    
        }        
        path{
            fill:${({theme})=> darken(0.2,theme.colors.blue)};
            transition:fill 500ms;
        }
        margin:0 !important;        
    }
    :hover{
        svg{
            path{
                fill:${({theme})=> darken(0.1,theme.colors.blue)};
                transition:fill 500ms;
            }
        }
    }
    transition:padding-bottom 500ms;
    ${({active,theme}) => active && css`
        svg{
            path{
                fill:${({theme})=> theme.colors.blue}!important;
                transition:fill 500ms;
            }
        }
    `}
    outline:none;
`


export const TabIconSizeFix = styled.div`
    margin-right:1rem;
    padding-bottom:.5rem;
    margin-top:.05rem;
    cursor:pointer;
    svg{
        transition:width 500ms,height 500ms,opacity 500ms;
        ${({state}) => state==='full'?
            css`
                width:2.8rem;
                height:2.7rem;
            `
            :
            css`
                width:1.8rem;
                height:1.8rem;
            `    
        }
        ${({active}) => !active && css`            
            opacity:.5;   
            :hover{
                opacity:.8;
            }          
        `}         
    }
`


export const TabIconsContainer = styled.div`
    display:flex;
    width:fit-content;
`

let body_state = {
    minimized:css`
        margin-top:0;
        height:0;        
    `,
    full:css`
        margin-top:.5rem;
        height:15.5rem; 
        @media(min-width:1200px){
            height:22rem;
        }
    `,
    hide:css`
        margin-top:0;
        height:0;
    `
}

const anim = keyframes`
    from{
        height:15.5rem;
    }
    to{
        height:0;
    }
`

export const Body = styled.div`
    margin-top:.5rem;
    overflow:auto;
    transition: height 500ms,margin-top 500ms,width 500ms;
    animation:${anim} ease-out 1s;
`



export const Container = styled.div`
    ${Body}{
        ${({state}) => body_state[state]}
    }
`
import { darken, lighten } from 'polished'
import styled, {css} from 'styled-components'



let tabicon_state = {
    minimized:'2rem',
    full:'3rem',
    hide:'0'
}

export const TabIcon = styled.div`
    margin-right:1rem;
    padding-bottom:.5rem;
    cursor:pointer;
    svg{
        transition:width 500ms,height 500ms;
        width:3rem;
        height:3rem;
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
        /* @media(min-width:300px){
            height:11.5rem;
        } */
        @media(min-width:1200px){
            height:22rem;
        }
    `,
    hide:css`
        margin-top:0;
        height:0;
    `
}

export const Body = styled.div`
    margin-top:.5rem;
    overflow:auto;
    transition: height 500ms,margin-top 500ms,width 500ms;
`

export const Container = styled.div`
    ${Body}{
        ${({state}) => body_state[state]}
    }
    ${TabIcon}{
        ${({state}) => state === 'minimized' && css`
            border-bottom:1px solid transparent;
            padding-bottom:0;
        ` }
        svg{
            width:${({state}) => tabicon_state[state]};
            height:${({state}) => tabicon_state[state]};
        }
    }
`
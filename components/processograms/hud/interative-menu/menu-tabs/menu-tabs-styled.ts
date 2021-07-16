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
        transition:width 500ms;
        width:3rem;
        height:3rem;
        path{
            fill:${({theme})=>theme.colors.blue};
        }
        margin:0 !important;        
    }
    transition:border-bottom 500ms,padding-bottom 500ms;
    border-bottom:1px solid transparent;
    ${({active,theme}) => active && css`
        box-sizing: border-box;        
        border-bottom:1px solid ${theme.colors.blue};
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
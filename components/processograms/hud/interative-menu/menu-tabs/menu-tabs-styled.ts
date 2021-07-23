import { darken } from 'polished'
import styled, {css,keyframes} from 'styled-components'



export const TabIcon = styled.div`
    margin-right:1rem;
    padding-bottom:.5rem;
    cursor:pointer;
    svg{
        transition:width 500ms ease-in-out,height 500ms ease-in-out;
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
        margin:0 !important;   
        path{
            fill:${({theme})=> theme.colors.blue};
            transition:fill 500ms;
        }     
    }
    ${({state,active}) => state==='full'?css`
        ${active?css`
            filter:brightness(1);            
        `:
        css`
            filter:brightness(.5);            
            :hover{
                filter:brightness(.8);
            }
        `}
    `:css`
        opacity:0;
    `}
    transition:padding-bottom 500ms,filter 500ms,opacity 500ms;
    outline:none;
`


export const TabIconSizeFix = styled.div`
    margin-right:1rem;
    padding-bottom:.5rem;
    margin-top:.05rem;
    cursor:pointer;
    svg{
        transition:width 500ms,height 500ms,filter 500ms;
        ${({state,active}) => state==='full'?
            css`
                width:2.8rem;
                height:2.7rem;                
                ${active?css`
                    filter:brightness(1);                    
                `:
                css`
                    filter:brightness(0.5);                    
                    :hover{
                        filter:brightness(0.8);                        
                    }
                `} 
            `
            :
            css`
                width:1.8rem;
                height:1.8rem;
                
                filter:brightness(0.5);                    
                :hover{
                    filter:brightness(0.8);                        
                }
                    
                
            `    
        }
         
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
    transition: height 500ms ease-in-out,margin-top 500ms ease-in-out,width 500ms ease-in-out;
    animation:${anim} ease-in-out 1s;    
`



export const Container = styled.div`
    ${Body}{
        ${({state}) => body_state[state]}
    }
`
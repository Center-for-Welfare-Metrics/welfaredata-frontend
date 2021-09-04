import styled, {css} from 'styled-components'

export const SvgContainer = styled.div`       
    width:100%;
    margin:2.5rem 0;
    :first-child{
        margin-top:5rem;        
    }
    :last-child{
        margin-bottom:5rem;        
    }
    >svg{        
        height:auto;            
        overflow:visible; 
        z-index:77;        
        width:80%;
        margin-inline:auto;        
        opacity:1;
        display:block;       
        min-height:5rem;
        z-index: 77;
        max-height:80vh;  
        /* shape-rendering: optimizeSpeed;
        text-rendering: optimizeSpeed;       */
    }
    @media (max-width:800px) {
        >svg {
            shape-rendering: optimizeSpeed;
            text-rendering: optimizeSpeed;
        }
    }
    ${
        ({level}) => level === undefined && css`
            >svg{
                width:auto;
                max-width:80%;
            }
        `
    }
    
    @media(max-width:800px){
        margin:1rem 0;
    }
`
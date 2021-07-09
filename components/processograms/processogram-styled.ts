import styled, {css} from 'styled-components'

export const SvgContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding:2.5% 0 2.5% 0;
    width:80%;    
    z-index: 77;
    margin:auto;
    :first-child{
        padding-top:5%;
    }
    :last-child{
        padding-bottom:5%;
    }
    svg{
        height:auto;            
        transition:opacity 500ms;   
        overflow:visible; 
        z-index:77;       
    }
    ${({innerlevel,hover,level,current,equallevel}) => level > 0 && css`
        [id*=${innerlevel}]{            
            transition: stroke-opacity 500ms;
        }
        [id*=${equallevel}]{            
            stroke-opacity:.4;                    
        }        
        ${
            hover?css`
                #${current} #${hover}{                    
                    stroke-opacity: 1;
                }
            `
            :
            css`              
                #${current}{                    
                    stroke-opacity: 1;
                }                
            `
        }
    `}    

    @media(max-width:800px){
        ${({current}) => css`
            #${current}{
                stroke-opacity:1;
            }
        `}
    }
`
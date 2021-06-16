import styled, {css} from 'styled-components'



export const SvgContainer = styled.div`
    margin:5% 0 5% 0;
    svg{
        height:auto;
    }
    ${({innerlevel,hover,level,current,equalLevel}) => level > 0 && css`
        [id*=${innerlevel}]{            
            transition: stroke-opacity 500ms;
        }
        [id*=${equalLevel}]{            
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
`
import styled, {css} from 'styled-components'

export const Title = styled.div`
    
`

export const SvgContainer = styled.div`    
    svg{
        height:auto;        
        margin:5% 0 5% 0;
        transition:opacity 500ms;   
        overflow:visible;   
    }
    :first-child{
        svg{
            margin-top:10%;
        }
    }
    :last-child{
        svg{
            margin-bottom:10%;
        }
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
    
    ${({selected}) => selected && css`
        svg:not(#${selected}){
            opacity:0;
            transition:opacity 500ms;            
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
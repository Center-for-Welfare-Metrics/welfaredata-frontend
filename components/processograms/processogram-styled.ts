import styled, {css,keyframes} from 'styled-components'

let fade = keyframes`
    0%{opacity:0}
    100{opacity:1}
`

export const Arrow = styled.div`
    position:fixed;
    color:white;
    font-size:4rem;       
    
    animation: ${fade} 500ms;
    cursor: pointer;
    z-index:100;
`

export const ToRight = styled(Arrow)`
    transform:translate(10%,-50%);
`

export const ToLeft = styled(Arrow)`
    transform:translate(-110%,-50%);
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
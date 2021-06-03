import styled, {css} from 'styled-components'

import SVG from 'react-inlinesvg'

const time = '500ms'

export const Container = styled.div`    
    width:${(dataentry) => dataentry?'90%':'60%'};
    margin:0 auto 0 auto;
    svg{
        margin-top:5rem;
    }
    overflow:visible;    
    ${({mouseover,focusedlayer}) => (
        mouseover==='' && css`
            svg{
                stroke-opacity:.3;    
                transition:stroke-opacity ${time};            
            }
            ${
                focusedlayer?(css`
                    [id=${focusedlayer}]{
                        stroke-opacity:1;
                        transition:stroke-opacity ${time};  
                    }
                `):
                (css`
                    svg{
                        stroke-opacity:1;
                        transition:stroke-opacity ${time};
                    }
                `)
            }            
        `
    )}
    ${({mouseover,focusedlayer}) => (     
        mouseover !=='' && css`
            svg{
                stroke-opacity:.3; 
                transition:stroke-opacity ${time};            
            }
            ${
                focusedlayer?(css`
                    #${focusedlayer} > [id=${mouseover}]{
                        stroke-opacity:1;
                        transition:stroke-opacity ${time};
                    }
                `):
                (css`
                    [id=${mouseover}]{
                        stroke-opacity:1;
                        transition:stroke-opacity ${time};
                    }
                `)
            }            
        `
    )}
    ${({oncontext,focusedlayer}) => (
        oncontext !=='' && css`
        svg{
            stroke-opacity:.3; 
            transition:stroke-opacity ${time};            
        }
        [id=${focusedlayer}]{
            stroke-opacity:.3;
            transition:stroke-opacity ${time};  
        }
        [id=${oncontext}]{
            stroke-opacity:1;
            transition:stroke-opacity ${time};
        }
        `
    )}
    @media(max-width:800px){
        width:90%;
        svg{
            margin-top:3rem;
        }
        ${({focusedlayer}) => css`
            [id=${focusedlayer}]{
                stroke-opacity:1;
                transition:stroke-opacity ${time};
            }
        `}
    } 
`

export const Svg = styled(SVG)`
    cursor:${({cantclick})=>cantclick?'not-allowed':'default'};
`

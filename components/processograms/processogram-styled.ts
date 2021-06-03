import styled, {css} from 'styled-components'

import SVG from 'react-inlinesvg'

const time = '500ms'

export const Container = styled.div`
    margin-bottom:5rem;
    width:60%;
    margin:0 auto 5rem auto;
    /* transition:width ${time}; */
    overflow:visible;
    ${({first}) => first && css`
        svg{
            margin-top:10rem;
        }
    `}
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
`

export const Svg = styled(SVG)`
    cursor:${({cantclick})=>cantclick?'not-allowed':'default'};
`
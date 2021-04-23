import styled, {css} from 'styled-components'

import SVG from 'react-inlinesvg'

export const Container = styled.div`
    margin-bottom:5rem;
    width:100%;
    transition:width 500ms;
    overflow:visible;    
    ${({mouseover}) => (
        mouseover==='' && css`
            svg{
                stroke-opacity:1;    
                transition:stroke-opacity 500ms;            
            }
        `
    )}
    ${({mouseover}) => (        
        mouseover !=='' && css`
            svg{
                stroke-opacity:.3;    
                transition:stroke-opacity 500ms;            
            }
            [id=${mouseover}]{
                stroke-opacity:1;
                transition:stroke-opacity 500ms;
            }
        `
    )}
`

export const Svg = styled(SVG)`
    
`
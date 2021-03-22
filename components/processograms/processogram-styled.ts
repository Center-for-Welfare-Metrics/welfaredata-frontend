import styled, {css} from 'styled-components'

import SVG from 'react-inlinesvg'

export const Container = styled.div`
    margin-bottom:5rem;
    width:100%;
    transition:width 500ms;
    overflow:visible;
    transition:stroke-opacity 500ms;
    ${({level,mouseover})=>(         
         level === '--ps' && mouseover === '' && css`
            stroke-opacity:1;
            transition:stroke-opacity 500ms;
         `
    )}
    ${({level,mouseover})=>(         
         level === '--ps' && mouseover !== '' && css`
            stroke-opacity:.5;
            transition:stroke-opacity 500ms;
            [id=${mouseover}]{
                stroke-opacity:1;
                transition:stroke-opacity 500ms;
            }
         `
    )}
`

export const Svg = styled(SVG)`
    ${({level})=>(         
         level === '--lf' && css`
            stroke-opacity:.5;            
            [id*=--lf]{
                transition:stroke-opacity 500ms;
                :hover{                    
                    stroke-opacity:1;
                    transition:stroke-opacity 500ms;
                }
            }
         `
    )}
    ${({level,g_id})=> level!=='--ps' && css`
        stroke-opacity:.3;
        [id=${g_id}]{     
            stroke-opacity:.5;       
            [id*=${level}]{                
                transition:stroke-opacity 500ms;
                :hover{
                    stroke-opacity:1;
                    transition:stroke-opacity 500ms;
                }
            }            
        }  
    `}
    ${({level,g_id})=>(
        level === '-last-' && css`
            [id*=--ci]{
                stroke-opacity:.5;                
            }
            [id=${g_id}]{
                stroke-opacity:1;
            }
        `
    )}
`
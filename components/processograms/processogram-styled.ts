import styled from 'styled-components'

import SVG from 'react-inlinesvg'

export const Container = styled.div`
    margin-bottom:5rem;
    width:100%;
    transition:width 500ms;
    overflow:visible;
`

export const Svg = styled(SVG)`
    ${({level,g_id})=>(
        level==='-last-' && `
            [id*=--ci]{
                opacity:.5;                
            }
            [id=${g_id}]{
                opacity:1;
            }
        `
    )}
    [id*=${({level})=>level}]{
        opacity:.5;
        :hover{
            opacity:1;
        }
        transition:opacity 500ms;
    }
    transition:opacity 500ms;
`
import styled from 'styled-components'

import SVG from 'react-inlinesvg'

export const Container = styled.div`
    margin-bottom:5rem;
    width:60rem;
    transition:width 500ms;
`

export const Svg = styled(SVG)`
    ${({level})=>(
        level==='--ps' && `
            opacity:.5;
            :hover{
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
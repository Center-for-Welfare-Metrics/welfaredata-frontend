import styled from 'styled-components'

import SVG from 'react-inlinesvg'

export const Container = styled.div`
    margin-bottom:5rem;
`

export const Svg = styled(SVG)`
    width: 60rem;
    height:auto;
    opacity:${({off})=>off==='true'?0.2:1};
    transition:all 500ms;
`
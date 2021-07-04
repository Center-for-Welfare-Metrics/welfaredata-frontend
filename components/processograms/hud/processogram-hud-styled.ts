import styled,{keyframes} from 'styled-components'


let fade = keyframes`
    0%{opacity:0}
    100{opacity:1}
`

export const Container = styled.div`
    position:absolute;
    animation: ${fade} 500ms;    
`
import { lighten } from 'polished'
import styled,{css} from 'styled-components'

const scrollBar = (color,size='.5rem') => css`
    ::-webkit-scrollbar {
        width: ${size};
        height: ${size};
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors[color]};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors[color])};
        transition: background-color 500ms;
    }
`

export const Container = styled.div`
    height:${({full}) => full?'100vh':'90vh'};
    overflow:auto;    
    position:relative;  
    ${scrollBar('gray')};
`
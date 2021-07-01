import { lighten } from 'polished'
import styled , {css} from 'styled-components'
const time = '500ms'

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
    padding:0 10% 0 10%;    
    height:100vh;
    overflow-y: auto;
    position:relative;
    ${({current,hover}) => (current === null) && hover?css`
        svg{
            transition:opacity ${time};
            opacity: .5;
        }
        svg#${hover}{
            transition:opacity ${time};
            opacity: 1;
        }
    `:
    current === null && css`
    svg{
        transition:opacity ${time};
        opacity: 1;
    }
`    
    }        
    ${scrollBar('gray')};
`
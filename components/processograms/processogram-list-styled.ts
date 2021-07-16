import { lighten, transparentize } from 'polished'
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
export const OverlapingMaster = styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:999;
    background-color:  ${transparentize(0.8,'black')};
`

export const SubContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;    
`

export const Container = styled.div`
    position:relative;
    overflow:auto;           
    height: 100%;
    width: 100%;            
    ${({current,hover}) => (current === null) && hover && css`
        svg{
            /* transition:opacity ${time}; */
            opacity: .5;
        }
        svg#${hover}{
            /* transition:opacity ${time}; */
            opacity: 1;
        }
    `}    
    ${({current}) => current===null && css`                
        svg{
            transition:opacity 500ms;
        }
        
    `}
    ${scrollBar('gray')}
`
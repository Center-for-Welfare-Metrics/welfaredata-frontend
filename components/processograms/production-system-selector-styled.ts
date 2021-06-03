import { transparentize } from 'polished'
import styled , {css} from 'styled-components'

export const CommonTitle = styled.div`
    color:${({theme})=>theme.colors.blue};        
    padding:0;
    background-color:${({theme})=> transparentize(0.3,theme.colors.black) };
    /* backdrop-filter:blur(5px); */
    border-radius:1rem;    
    z-index:400;
`


export const GreatTitle = styled(CommonTitle)`
    position:fixed;
    font-size:${({theme})=>theme.fontSize.extraLarge};   
    left:50%;
    top:5rem;
    transform: translateX(-50%);
`

export const Title = styled(CommonTitle)`
    position:absolute;
    font-size:${({theme})=>theme.fontSize.large};         
    top:${({top}) => `${top}px`};
    left:${({left}) => `${left}px`};
    transform: translateY(-100%);
`



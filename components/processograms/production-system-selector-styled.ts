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
    font-size:${({theme})=>theme.fontSize.normal};  
    left:50%;
    top:5rem;
    transform: translateX(-50%);
`

export const Title = styled(CommonTitle)`
    position:${({top}) => top?'absolute':'fixed'};
    font-size:${({theme})=>theme.fontSize.normal};         
    top:${({top}) => top?`${top}px`:'10rem'};
    left:${({left}) => left?`${left}px`:'20%'};
    transform: translateY(-100%);
`



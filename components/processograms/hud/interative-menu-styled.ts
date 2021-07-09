import { transparentize } from 'polished'
import styled , {keyframes} from 'styled-components'

const anim = keyframes`
    0%{transform:translate(-50%,100%);}
    100%{transform:translate(-50%,90%);}
`

export const Container = styled.div`
    position:absolute;
    bottom:0;    
    left:50%;
    transform:translate(-50%,90%);
    width:95%;
    height:20rem;
    background-color:${({theme}) => transparentize(0.1,theme.colors.deep_blue)};
    z-index:2;
    border-top-right-radius:.5rem;
    border-top-left-radius:.5rem;
    animation: ${anim} 1s;
`
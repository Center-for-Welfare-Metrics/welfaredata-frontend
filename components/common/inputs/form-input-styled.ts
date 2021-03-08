import { lighten } from 'polished'
import styled,{css} from 'styled-components'

export const Container = styled.div`
    padding:2rem;
    position: relative;
    display:flex;
    flex-direction: column;
    box-sizing:border-box;
    width:100%;
`

export const Icon = styled.i`
    position:absolute;
    top:2.5rem;
    left:2rem;
    color:${({theme})=>theme.colors.yellow};
    font-size:${({theme})=>theme.fontSize.large};
`

export const Label = styled.label`
    color:${({theme})=>lighten(0.1,theme.colors.white)};
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    transition: all 500ms;
    z-index:-1;
    white-space: nowrap;
    ${({ focus,theme }) => focus && css`
        top:1rem;
        left:2rem;
        transform: translate(0,0);
        transition: all 500ms;
        z-index:auto;
        font-size:${theme.fontSize.small}
    `}
`
export const Error = styled.span`
    font-size:${({theme})=>theme.fontSize.small};
    color:${({theme})=>theme.colors.red};
    white-space: pre-wrap;
    text-align: center;
    font-weight:bold;
`
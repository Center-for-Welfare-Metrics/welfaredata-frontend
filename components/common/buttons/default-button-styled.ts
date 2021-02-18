import styled, {keyframes} from 'styled-components'
import { darken } from 'polished'

const shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`

export const DefaultButton = styled.button`
    margin-top:1rem;
    background-color:${({theme})=>theme.colors.local_deep_blue};
    color:white;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    padding:.5rem .8rem .5rem .8rem;
    outline:none;
    :hover{
        transform: scale(1.15) translateY(-5px);
        transition: transform 500ms;
    }
    :disabled{
        background-color:gray;
        :hover{
            transform:scale(1) translateY(0);
        }
        cursor:not-allowed;
    }
    transition: transform 500ms;
`

export const DangerButton = styled(DefaultButton)`
    background-color:${({theme})=> darken(0.15,theme.colors.local_red)};
    color:${({theme})=>theme.colors.local_black};
    :hover{
        animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        perspective: 1000px;
    }
`

export const SuccessButton = styled(DefaultButton)`
    background-color:${({theme})=>theme.colors.local_green};
`
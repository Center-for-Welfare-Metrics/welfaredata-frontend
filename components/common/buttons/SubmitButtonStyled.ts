import {darken} from 'polished'
import styled from 'styled-components'

export const Button = styled.button`
    border:none;
    background-color: ${({theme})=>theme.colors.local_green};
    color:white;
    cursor:pointer;
    padding:.5rem 1rem .5rem 1rem;
    outline: none;
    transition:background-color 500ms;
    :hover{
        background-color: ${({theme})=> darken(0.1,theme.colors.local_green)};
        transition:background-color 500ms;
    }
`
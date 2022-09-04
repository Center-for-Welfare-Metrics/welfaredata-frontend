import {darken,lighten} from 'polished'
import styled from 'styled-components'

export const Button = styled.button`
    border:none;
    background-color: ${({theme})=>theme.colors.green};
    color:white;
    cursor:pointer;
    padding:.5rem 1rem .5rem 1rem;
    outline: none;
    transition:background-color 500ms;
    :hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.green)};
        transition:background-color 500ms;
    }
`
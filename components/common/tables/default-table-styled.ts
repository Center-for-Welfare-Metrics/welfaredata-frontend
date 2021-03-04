import styled from 'styled-components'
import {lighten,darken} from 'polished'

export const Table = styled.table`
    color:${({theme})=>theme.colors.local_white};
    border-collapse: collapse;
`


export const Td = styled.td`
    border:none;
    border-left:none;
    border-right:none;
    text-align: left;
    padding: .5rem .5rem .5rem .5rem;
`

export const Th = styled.tr`
    text-align:left;
`

export const Tr = styled.tr`
    text-align:left;
    cursor: pointer;
    :nth-child(even){
        background-color: ${({theme})=>theme.colors.local_black};
    }
    :nth-child(odd){
        background-color: ${({theme})=>theme.colors.local_deep_blue};
    }
    :hover{
        transform: scale(1.07) translateY(-5px);
        transition:transform 500ms;
    }
    transition:transform 500ms;
`
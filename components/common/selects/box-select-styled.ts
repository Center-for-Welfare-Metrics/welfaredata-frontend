import styled from 'styled-components'
import { darken } from 'polished'


export const Container = styled.div`
    margin-top:1rem;
    margin-bottom:1rem;
`

export const Options = styled.div`
    background-color:${({theme})=>theme.colors.local_red};
    border-radius:1rem;
`

export const Option = styled.div`
    padding:.5rem;
    cursor: pointer;
    :first-child{
        border-top-left-radius:1rem;
        border-top-right-radius:1rem;
    }
    :last-child{
        border-bottom-left-radius:1rem;
        border-bottom-right-radius:1rem;
    }
    background-color:${({theme,selected})=>selected?darken(0.1,theme.colors.local_red):theme.colors.local_red};
    :hover{
        background-color:${({theme})=> darken(0.1,theme.colors.local_red)};
    }
    ${({selected})=>selected?'transform:scale(1.015);':''}
`
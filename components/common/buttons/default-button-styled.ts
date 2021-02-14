import styled from 'styled-components'

export const DefaultButton = styled.button`
    margin-top:1rem;
    border:2px solid ${({theme})=>theme.colors.local_green};
    background-color:${({theme})=>theme.colors.local_black};
    color:${({theme})=>theme.colors.local_green};
    font-size:${({theme})=>theme.fontSize.medium};
    cursor: pointer;
    padding:.5rem;
    outline:none;
    :hover{
        color:${({theme})=>theme.colors.local_black};
        background-color:${({theme})=>theme.colors.local_green};
        transition: color 500ms, background-color 500ms;
    }
    transition: color 500ms, background-color 500ms;
`
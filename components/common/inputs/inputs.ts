import styled from 'styled-components'
import { lighten } from 'polished'

export const LabeledInput = styled.input`
    padding:.5rem 0 .5rem 0;
    border:none;
    background-color: transparent;
    color:${({theme})=>theme.colors.local_white};
    border-bottom:1px solid ${({theme})=>theme.colors.local_white};
    outline: none;
    :disabled{
        cursor:not-allowed;
    }
    font-size:${({theme})=>theme.fontSize.normal};
`



export const CleanInput = styled.input`
    background-color: transparent;
    color:white;
    border:none;
    outline:none;
    text-indent:0;
`

export const CleanTextArea = styled.textarea`
    background-color: transparent;
    color:white;
    border:none;
    outline:none;
    resize:none;
    text-indent:0;
    font-family:inherit;
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.local_pink};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.local_pink)};
        transition: background-color 500ms;
    }
    :disabled{
        cursor:not-allowed;
    }
    font-size:1rem;
    height:fit-content;
    max-height:10rem;
`


export const LabeledTextArea = styled(CleanTextArea)`
    padding:.5rem 0 .5rem 0;
    border:none;
    background-color: transparent;
    color:${({theme})=>theme.colors.local_white};
    border-bottom:1px solid ${({theme})=>theme.colors.local_white};
    outline: none;
`
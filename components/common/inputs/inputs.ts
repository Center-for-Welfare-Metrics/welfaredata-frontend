import styled , {keyframes} from 'styled-components'

import TextareaAutosize from 'react-textarea-autosize';
import { lighten } from 'polished';


const globalColor = (theme) => theme.colors.white


export const LabeledInput = styled.input`
    padding:.5rem 0 .5rem 0;
    border:none;
    background-color: transparent;
    color:${({theme})=> globalColor(theme)};
    border-bottom:1px solid ${({theme})=>theme.colors.blue};
    outline: none;
    :disabled{
        cursor:not-allowed;
    }
    :focus{
        border-bottom:1px solid ${({theme})=> lighten(0.3,theme.colors.blue)};        
    }
    font-size:${({theme})=>theme.fontSize.normal};
`

export const CleanInput = styled.input`
    background-color: transparent;
    color:${({theme})=>globalColor(theme)};
    border:none;
    outline:none;
    text-indent:0;
`

export const CleanTextArea = styled(TextareaAutosize)`
    background-color: transparent;
    color:${({theme})=>globalColor(theme)};
    border:none;
    outline:none;
    resize:none;
    text-indent:0;
    font-family:inherit;
    :disabled{
        cursor:not-allowed;
    }
    font-size:1rem;    
    max-height:15rem;
`


export const LabeledTextArea = styled(CleanTextArea)`
    padding:.5rem 0 .5rem 0;
    border:none;
    background-color: transparent;
    color:${({theme})=>globalColor(theme)};
    border-bottom:1px solid ${({theme})=>theme.colors.blue};
    outline: none;
`
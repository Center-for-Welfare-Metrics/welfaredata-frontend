import { useState,FC,InputHTMLAttributes, useEffect, TextareaHTMLAttributes } from 'react'

import {Container,Label,Icon,Error} from './form-input-styled'
import { LabeledInput, LabeledTextArea } from './inputs'
import React from 'react'

export interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
    name:string,
    type?:string,
    error?:string,
    label:string,
    icon?:string,
    value:any,
    multiline?:boolean
    disabled?:boolean
    defaultValue?:any
}

const FormInput : FC<IFormInput> | FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (
    {
        name,
        multiline=false,
        type='text',
        error,
        label,
        icon,
        value,
        disabled=false,
        defaultValue=null,
        ...rest
    }
) => {

    const [onFocus,setFocus] = useState(false)

    const moveLabel = () => {
        if(!onFocus){
            setFocus(true)
        }else if(value===''){
            setFocus(false)
        }
    }

    useEffect(()=>{
        if(value || defaultValue){
            setFocus(true)
        }else{
            setFocus(false)
        }
    },[value,defaultValue])

    return (
        <Container>
            <Label focus={onFocus} htmlFor={name}>{label}</Label>
            {
                multiline?
                (
                    <LabeledTextArea 
                        id={name}
                        name={name}
                        type={type}
                        onFocus={moveLabel}
                        onBlur={moveLabel}
                        value={value}
                        disabled={disabled}
                        {...rest}
                    />
                )
                :
                (
                    <LabeledInput 
                        id={name}
                        name={name}
                        type={type}
                        onFocus={moveLabel}
                        onBlur={moveLabel}
                        value={value}
                        disabled={disabled}
                        {...rest}
                    />
                )
            }
            
            {error && <Error>
                {error}
            </Error>}
        </Container>
    )
}

export default React.memo(FormInput)
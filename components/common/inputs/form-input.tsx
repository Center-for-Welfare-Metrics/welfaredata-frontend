import { useState,FC,InputHTMLAttributes, useEffect } from 'react'

import {Container,Label,Icon,Error,Input} from './form-input-styled'


interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
    name:string,
    type?:string,
    error:string[],
    label:string,
    icon?:string,
    value:any
}

const FormInput : FC<IFormInput> = (
    {
        name,
        type='text',
        error,
        label,
        icon,
        value,
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
        if(value){
            setFocus(true)
        }
    },[value])

    return (
        <Container>
            <Label focus={onFocus} htmlFor={name}>{label}</Label>
            {icon && <Icon aria-hidden className={`fas ${icon}`} />}
            <Input 
                id={name}
                name={name}
                type={type}
                onFocus={moveLabel}
                onBlur={moveLabel}
                value={value}
                {...rest}
            />
            {error && <Error>
                {error}
            </Error>}
        </Container>
    )
}

export default FormInput
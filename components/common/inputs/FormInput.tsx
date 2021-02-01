import { useState,FC,InputHTMLAttributes } from 'react'

import {Container,Label,Icon,Error,Input} from './FormInputStyled'


interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
    name:string,
    type?:string,
    error:string[],
    label:string,
    icon:string
}

const FormInput : FC<IFormInput> = (
    {
        name,
        type='text',
        error,
        label,
        icon,
        ...rest
    }
) => {

    const [onFocus,setFocus] = useState(false)

    const moveLabel = () => {
        let {value} = rest
        if(!onFocus){
            setFocus(true)
        }else if(value===''){
            setFocus(false)
        }
    }

    return (
        <Container>
            <Label focus={onFocus} htmlFor={name}>{label}</Label>
            <Icon aria-hidden className={`fas ${icon}`} />
            <Input 
                id={name}
                name={name}
                type={type}
                onFocus={moveLabel}
                onBlur={moveLabel}
                {...rest}
            />
            {error && <Error>
                {error}
            </Error>}
        </Container>
    )
}

export default FormInput
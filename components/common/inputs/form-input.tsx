import { useState,FC,InputHTMLAttributes } from 'react'
import styles from './form-input.module.scss'

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
        <div className={styles.container}>
            <label className={`${styles.label} ${onFocus?styles.focus:''}`} htmlFor={name}>{label}</label>
            <i aria-hidden className={`fas ${icon}`} />
            <input 
                id={name}
                name={name}
                type={type}
                onFocus={moveLabel}
                onBlur={moveLabel}
                {...rest}
            />
            {error && <span className={styles.error}>
                {error}
                {/* {
                    Array.isArray(error)? (error.join('\n')) : (error)
                } */}
            </span>}
        </div>
    )
}

export default FormInput
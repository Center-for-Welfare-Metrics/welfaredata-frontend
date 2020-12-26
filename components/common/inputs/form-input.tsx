import { useState } from 'react'
import styles from './form-input.module.scss'

const FormInput = (
    {
        name,
        type='text',
        placeholder='',
        onChange,
        className='',
        value,
        error,
        label,
        icon
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

    return (
        <div className={styles.container}>
            <label className={`${styles.label} ${onFocus?styles.focus:''}`} htmlFor={name}>{label}</label>
            <i aria-hidden className={`fas ${icon}`} />
            <input 
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`${className}`}
                onFocus={moveLabel}
                onBlur={moveLabel}
            />
            {error && <span>{error}</span>}
        </div>
    )
}

export default FormInput
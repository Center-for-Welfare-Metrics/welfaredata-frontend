import {FC,ButtonHTMLAttributes} from 'react'
import styles from './submit-button.module.scss'



const SubmitButton : FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,...rest
}) => {

    return (
        <button className={styles.container} {...rest}>{children}</button>
    )
}



export default SubmitButton
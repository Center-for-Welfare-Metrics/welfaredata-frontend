import {FC,ButtonHTMLAttributes} from 'react'
import {Button} from './submit-button-styled'

const SubmitButton : FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,...rest
}) => {

    return (
        <Button {...rest}>{children}</Button>
    )
}



export default SubmitButton
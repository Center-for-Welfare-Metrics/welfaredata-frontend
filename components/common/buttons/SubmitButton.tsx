import {FC,ButtonHTMLAttributes} from 'react'
import {Button} from './SubmitButtonStyled'

const SubmitButton : FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,...rest
}) => {

    return (
        <Button {...rest}>{children}</Button>
    )
}



export default SubmitButton
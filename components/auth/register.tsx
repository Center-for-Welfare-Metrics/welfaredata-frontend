import styles from './login.module.scss'
import FormInput from '../common/inputs/form-input'
import SubmitButton from '../common/buttons/submit-button'
import Link from 'next/link'
import { useState } from 'react'

const Register = () => {
    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [password_repeat,setPasswordRepeat] = useState('')

    const [error,setError] = useState({email:[],password:[],password_repeat:[]})

    return (
        <div className={styles.container}>
            <FormInput 
                label='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                error={error.email}
                name='email'
                icon='fa-user'
            />
            <FormInput 
                label='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                error={error.password}
                name='password'
                type='password'
                icon='fa-key'
            />
            <FormInput 
                label='Repeat Password'
                value={password_repeat}
                onChange={(e)=>setPasswordRepeat(e.target.value)}
                error={error.password_repeat}
                name='password_repeat'
                type='password'
                icon='fa-lock'
            />
            <SubmitButton onClick={console.log}>Register</SubmitButton>
            <span className={styles.register}>
                Already have account? <Link href='/login'>Log In</Link>
            </span>
        </div>
    )
}



export default Register
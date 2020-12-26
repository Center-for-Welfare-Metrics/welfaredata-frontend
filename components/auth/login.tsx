import { useState } from 'react'
import SubmitButton from '../common/buttons/submit-button'
import FormInput from '../common/inputs/form-input'
import styles from './login.module.scss'
import Link from 'next/link'

const Login = () => {

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [error,setError] = useState({email:[],password:[]})

    

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
            <SubmitButton onClick={console.log}>Log in</SubmitButton>
            <span className={styles.register}>
                Don't have account? <Link href='/register'>Register Now</Link>
            </span>
        </div>
    )
}



export default Login
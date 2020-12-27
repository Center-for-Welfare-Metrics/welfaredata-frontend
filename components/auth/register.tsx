import styles from './login.module.scss'
import FormInput from '../common/inputs/form-input'
import SubmitButton from '../common/buttons/submit-button'
import Link from 'next/link'
import { useState } from 'react'
import authApi from '../../api/auth'

const Validator = require('validatorjs')

const Register = () => {
    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [password_confirmation,setPasswordConfirmation] = useState('')
    
    const [error,setError] = useState({email:[],password:[],password_confirmation:[]})


    const register = () => {
        let validation = new Validator({email,password,password_confirmation},{
            email:'required|email',
            password:'min:6|confirmed'
        })
        
        validation.passes(()=>{
            authApi.register({email,password,password_confirmation})
            .then((response)=>{
                console.log(response)
            })
            .catch((error)=>{
                console.error(error)
            })
            
        })

        validation.fails(()=>{
            setError(validation.errors.errors)
        })
    }

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
                label='Password Confirmation'
                value={password_confirmation}
                onChange={(e)=>setPasswordConfirmation(e.target.value)}
                error={error.password_confirmation}
                name='password_confirmation'
                type='password'
                icon='fa-lock'
            />
            <SubmitButton onClick={register}>Register</SubmitButton>
            <span className={styles.register}>
                Already have account? <Link href='/login'>Log In</Link>
            </span>
        </div>
    )
}



export default Register
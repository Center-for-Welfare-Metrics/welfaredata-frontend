import { useState } from 'react'
import SubmitButton from '../common/buttons/submit-button'
import FormInput from '../common/inputs/form-input'
import styles from './login.module.scss'
import Link from 'next/link'
import authApi from '../../api/auth'

const Validator = require('validatorjs')

const Login = () => {

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [error,setError] = useState({email:[],password:[]})

    const login = () => {
        let validation = new Validator({email,password},{
            email:'required|email',
            password:'min:6'
        })
        
        validation.passes(()=>{
            authApi.login({email,password})
            .then((response)=>{
                console.log(response)
            })
            .catch(({response})=>{
                setError(response.data)
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
            <SubmitButton onClick={login}>Log in</SubmitButton>
            <span className={styles.register}>
                Don't have account? <Link href='/register'>Register Now</Link>
            </span>
        </div>
    )
}



export default Login
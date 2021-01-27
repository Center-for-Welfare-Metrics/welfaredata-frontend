import { useContext, useState } from 'react'
import Link from 'next/link'
import SubmitButton from '@/components/common/buttons/submit-button'
import FormInput from '@/components/common/inputs/form-input'
import authApi from '@/api/auth'
import UserContext from '@/context/user'
import styles from './login.module.scss'

const Validator = require('validatorjs')

const Login = () => {

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [error,setError] = useState({email:[],password:[]})

    const {setUser} = useContext(UserContext)

    const login = (event) => {
        event.preventDefault()
        let validation = new Validator({email,password},{
            email:'required|email',
            password:'min:6',
        })
        
        validation.passes(()=>{
            authApi.login({email,password})
            .then((response)=>{
                setUser(response.data)
            })
            .catch(({response})=>{
                if(response){
                    setError(response.data)
                }
            })
        })

        validation.fails(()=>{
            setError(validation.errors.errors)
        })
    }

    return (
        <div className={styles.container}>
            <form method='POST' onSubmit={login}>
                <FormInput 
                    label='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    error={error.email}
                    name='email'
                    icon='fa-at'
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
                <SubmitButton type='submit'>Login</SubmitButton>
            </form>
            <span className={styles.register}>
                Don't have an account? <Link href='/register'>Register now!</Link>
            </span>
        </div>
    )
}



export default Login
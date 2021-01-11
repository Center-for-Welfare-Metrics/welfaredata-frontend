import { useContext, useState } from 'react'
import Link from 'next/link'
import FormInput from '@/components/common/inputs/form-input'
import SubmitButton from '@/components/common/buttons/submit-button'
import authApi from '@/api/auth'
import UserContext from '@/context/user'
import styles from './login.module.scss'

const Validator = require('validatorjs')

const Register = () => {
    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [password_confirmation,setPasswordConfirmation] = useState('')
    
    const [error,setError] = useState({email:[],password:[],password_confirmation:[]})

    const {setUser} = useContext(UserContext)

    const register = (event) => {
        event.preventDefault()
        let validation = new Validator({email,password,password_confirmation},{
            email:'required|email',
            password:'min:6|confirmed'
        })
        
        validation.passes(()=>{
            authApi.register({email,password,password_confirmation})
            .then((response)=>{
                setUser(response.data)
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
            <form method='POST' onSubmit={register}>
                <FormInput 
                    label='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    error={error.email}
                    name='email'
                    icon='fa-user'
                />
                <FormInput 
                    label='Senha'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    error={error.password}
                    name='password'
                    type='password'
                    icon='fa-key'
                />
                <FormInput 
                    label='Confirmar Senha'
                    value={password_confirmation}
                    onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    error={error.password_confirmation}
                    name='password_confirmation'
                    type='password'
                    icon='fa-lock'
                />
                <SubmitButton>Registrar</SubmitButton>
            </form>
            <span className={styles.register}>
                Já tem uma conta? <Link href='/login'>Entrar</Link>
            </span>
        </div>
    )
}



export default Register
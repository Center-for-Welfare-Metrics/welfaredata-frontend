import Register from "../../components/auth/register"
import onlyGuest from "@/components/HOC/only-guest"
import auth from "@/api/auth"
import { useContext, useEffect, useState } from "react"
import UserContext from "@/context/user"

import ErrorPage from 'next/error'

import CheckPasswordStrength from 'check-password-strength'
import { opacify } from "polished"
import Head from "next/head"

const Validator = require('validatorjs')

const RegisterPage = () => {

    const [name,setName] = useState('')

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [password_confirmation,setPasswordConfirmation] = useState('')
        
    const [error,setError] = useState<any>({})

    const [onFetch,setOnFetch] = useState(false)

    const {setUser} = useContext(UserContext)

    const [passwordStrength,setPasswordStrength] = useState('')

    useEffect(()=>{
        if(password){
            setPasswordStrength(CheckPasswordStrength(password).value)
        }else{
            setPasswordStrength('')
        }
    },[password])

    const register = (event) => {
        event.preventDefault()
        if(passwordStrength==='Weak'){
            setError({password:'Password too weak!'})
        }else{
            let validation = new Validator({name,email,password,password_confirmation},{
                email:'required|email',
                password:'min:6|confirmed|max:32|required',
                name:'required'
            })
            
            validation.passes(()=>{
                setOnFetch(true)
                auth.register({name,email,password,password_confirmation})
                .then((response)=>{
                    setOnFetch(false)
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
    }

    return(
        <>
        <Head>
            <title>Welfare Data - Register</title>
        </Head>
        <Register
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            password_confirmation={password_confirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            error={error}
            register={register}
            passwordStrength={passwordStrength}
        />
        </>
    )
}

// export default onlyGuest(RegisterPage)

const Unamed = () => <ErrorPage statusCode={404} />

export default Unamed
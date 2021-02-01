import Register from "../../components/auth/Register"
import onlyGuest from "@/components/HOC/onlyGuest"
import auth from "@/api/auth"
import { useContext, useState } from "react"
import UserContext from "@/context/user"

const Validator = require('validatorjs')

const RegisterPage = () => {

    const [name,setName] = useState('')

    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')

    const [password_confirmation,setPasswordConfirmation] = useState('')
    
    const [error,setError] = useState({email:[],password:[],password_confirmation:[],name:[]})

    const {setUser} = useContext(UserContext)

    const register = (event) => {
        event.preventDefault()
        let validation = new Validator({name,email,password,password_confirmation},{
            email:'required|email',
            password:'min:6|confirmed',
            name:'required'
        })
        
        validation.passes(()=>{
            auth.register({name,email,password,password_confirmation})
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

    return(
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
        />
    )
}

export default onlyGuest(RegisterPage)
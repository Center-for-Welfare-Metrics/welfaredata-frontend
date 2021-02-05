import { useContext, useState } from "react"
import Login from "@/components/auth/login"
import onlyGuest from "@/components/HOC/onlyGuest"
import UserContext from "@/context/user"
import auth from "@/api/auth"

const Validator = require('validatorjs')

const LoginPage = () => {

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
            auth.login({email,password})
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
        <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            login={login}
        />
    )
}

export default onlyGuest(LoginPage)
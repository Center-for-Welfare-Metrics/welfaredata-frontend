import Modal, {IModal} from '@/components/common/modal'
import { IUser } from '@/context/user'

import { useEffect, useState } from 'react'
import { ActionButtons, Container,FormHeader } from './users-styled'

import FormInput from '@/components/common/inputs/form-input'

import CheckPasswordStrength from 'check-password-strength'
import StrongPasswordBar from '@/components/miscellaneous/strong-password-bar'
import { DangerButton, SuccessButton } from '@/components/common/buttons/default-button-styled'

import adminUsersApi from '@/api/admin/users'

import toast, { Toaster } from 'react-hot-toast';

const Validator = require('validatorjs')

interface UserModal extends IModal{
    user?:IUser
}

const UserModal = ({onClose,isOpen,user}:UserModal) => {

    const [name,setName] = useState(user?.name || '')

    const [email,setEmail] = useState(user?.email || '')

    const [password,setPassword] = useState('')

    const [password_confirmation,setPasswordConfirmation] = useState('')

    const [error,setError] = useState<any>({})

    const [passwordStrength,setPasswordStrength] = useState('')

    const [hasUser,setHasUser] = useState(false)

    useEffect(()=>{
        if(user){
            setHasUser(true)
        }else{
            setHasUser(false)
        }
    },[user])

    useEffect(()=>{
        if(password){
            setPasswordStrength(CheckPasswordStrength(password).value)
        }else{
            setPasswordStrength('')
        }
    },[password])

    const clear = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
        setError({})
    }

    const create = (event) => {
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
                adminUsersApi.create({name,email,password,password_confirmation})                
                .then(()=>{
                    toast.success('User created successfully!')
                    onClose()
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

    return (
        <Modal onClose={onClose} isOpen={isOpen} clear={clear}>
            <Container>
                <FormHeader>Personal Informations</FormHeader>                
                <FormInput 
                    label='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    error={error.name}
                    name='name'                
                />
                <FormHeader>Account Informations</FormHeader>   
                <FormInput 
                    label='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    error={error.email}
                    name='email'
                    disabled={hasUser}                
                />
                {
                    !hasUser &&
                    <>
                        <FormInput 
                            label='Password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            error={error.password}
                            name='password'
                            type='password'                    
                        />
                        <StrongPasswordBar strength={passwordStrength} />
                        <FormInput 
                            label='Password Confirmation'
                            value={password_confirmation}
                            onChange={(e)=>setPasswordConfirmation(e.target.value)}
                            error={error.password_confirmation}
                            name='password_confirmation'
                            type='password'
                        />
                    </>
                }
                <ActionButtons>
                    <DangerButton onClick={onClose}>Cancel</DangerButton>
                    <SuccessButton onClick={create}>Create User</SuccessButton>
                </ActionButtons>
            </Container>
        </Modal>
    )
}



export default UserModal
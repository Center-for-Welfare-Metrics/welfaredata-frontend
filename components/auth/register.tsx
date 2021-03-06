import Link from 'next/link'
import FormInput from '@/components/common/inputs/form-input'
import { SuccessButton } from '@/components/common/buttons/default-button-styled'
import {Container,Form,LinkTo} from './auth-styled'
import StrongPasswordBar from '../miscellaneous/strong-password-bar'

const Register = ({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    password_confirmation,
    setPasswordConfirmation,
    error,
    register,
    passwordStrength,
    onFetch=false
}) => {

    return (
        <Container>
            <Form method='POST' onSubmit={register}>
                <FormInput 
                    label='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    error={error.name}
                    name='name'
                    icon='fa-user'
                />
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
                <StrongPasswordBar strength={passwordStrength} />
                <FormInput 
                    label='Password Confirmation'
                    value={password_confirmation}
                    onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    error={error.password_confirmation}
                    name='password_confirmation'
                    type='password'
                    icon='fa-lock'
                />
                <SuccessButton load={onFetch} type='submit'>Register</SuccessButton>
            </Form>
            <LinkTo>
                Already have an account? <Link href='/login'>Login!</Link>
            </LinkTo>
        </Container>
    )
}



export default Register
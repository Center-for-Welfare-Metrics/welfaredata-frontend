import Link from 'next/link'
import FormInput from '@/components/common/inputs/formInput'
import SubmitButton from '@/components/common/buttons/submitButton'
import {Container,Form,LinkTo} from './authStyled'

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
    register
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
                <FormInput 
                    label='Password Confirmation'
                    value={password_confirmation}
                    onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    error={error.password_confirmation}
                    name='password_confirmation'
                    type='password'
                    icon='fa-lock'
                />
                <SubmitButton>Register</SubmitButton>
            </Form>
            <LinkTo>
                Already have an account? <Link href='/login'>Login!</Link>
            </LinkTo>
        </Container>
    )
}



export default Register
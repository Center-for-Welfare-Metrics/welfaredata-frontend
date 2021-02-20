import Link from 'next/link'
import { SuccessButton } from '@/components/common/buttons/default-button-styled'
import FormInput from '@/components/common/inputs/form-input'
import {Container,Form,LinkTo} from './auth-styled'

const Login = (
    {
        email,
        setEmail,
        password,
        setPassword,
        login,
        error
    }
) => {
    return (
        <Container>
            <Form method='POST' onSubmit={login}>
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
                <SuccessButton type='submit'>Login</SuccessButton>
            </Form>
            <LinkTo>
                Don't have an account? <Link href='/register'>Register now!</Link>
            </LinkTo>
        </Container>
    )
}



export default Login
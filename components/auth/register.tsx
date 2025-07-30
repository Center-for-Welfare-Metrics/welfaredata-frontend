import Link from "next/link";
import { Container, Form, LinkTo } from "./auth-styled";
import StrongPasswordBar, {
  PasswordStrength,
} from "../miscellaneous/strong-password-bar";
import React, { ChangeEvent, FormEvent } from "react";
import { Button } from "../Button";
import { FormInput } from "../FormInput";

interface RegisterProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  password_confirmation: string;
  registrationCode: string;
  setRegistrationCode: (registrationCode: string) => void;
  setPasswordConfirmation: (passwordConfirmation: string) => void;
  error: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    registrationCode?: string;
  };
  register: (e: FormEvent<HTMLFormElement>) => void;
  passwordStrength: PasswordStrength;
  onFetch?: boolean;
}

const Register: React.FC<RegisterProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  registrationCode,
  setRegistrationCode,
  password_confirmation,
  setPasswordConfirmation,
  error,
  register,
  passwordStrength,
  onFetch = false,
}) => {
  return (
    <Container>
      <Form method="POST" onSubmit={register}>
        <FormInput
          label="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          error={error.name}
          name="name"
          icon="fa-user"
        />
        <FormInput
          label="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          error={error.email}
          name="email"
          icon="fa-at"
        />
        <FormInput
          label="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={error.password}
          name="password"
          type="password"
          icon="fa-key"
        />
        <StrongPasswordBar strength={passwordStrength} />
        <FormInput
          label="Password Confirmation"
          value={password_confirmation}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirmation(e.target.value)
          }
          error={error.password_confirmation}
          name="password_confirmation"
          type="password"
          icon="fa-lock"
        />
        <FormInput
          label="Registration Code"
          value={registrationCode}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRegistrationCode(e.target.value)
          }
          error={error.registrationCode}
          name="registration_code"
          icon="fa-key"
        />
        <Button loading={onFetch} type="submit" buttonStyle="success">
          Register
        </Button>
      </Form>
      <LinkTo>
        Already have an account? <Link href="/login">Login!</Link>
      </LinkTo>
    </Container>
  );
};

export default Register;

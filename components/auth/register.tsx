import Link from "next/link";
import FormInput from "@/components/common/inputs/form-input";
import { SuccessButton } from "@/components/common/buttons/default-button-styled";
import { Container, Form, LinkTo } from "./auth-styled";
import StrongPasswordBar, {
  PasswordStrength,
} from "../miscellaneous/strong-password-bar";
import React, { ChangeEvent, FormEvent } from "react";

interface RegisterProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  password_confirmation: string;
  setPasswordConfirmation: (passwordConfirmation: string) => void;
  error: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
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
        <SuccessButton load={onFetch} type="submit">
          Register
        </SuccessButton>
      </Form>
      <LinkTo>
        Already have an account? <Link href="/login">Login!</Link>
      </LinkTo>
    </Container>
  );
};

export default Register;

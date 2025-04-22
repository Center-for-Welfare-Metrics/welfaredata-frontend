import Link from "next/link";
import { FormInput } from "@/components/common/inputs/form-input";
import { Container, Form, LinkTo } from "./auth-styled";
import { Button } from "../Button";

interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  login: (e: React.FormEvent) => void;
  error: {
    email?: string;
    password?: string;
  };
  onFetch?: boolean;
}

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  login,
  error,
  onFetch = false,
}: LoginProps) => {
  return (
    <Container>
      <Form method="POST" onSubmit={login}>
        <FormInput
          label="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          error={error.email}
          name="email"
          icon="fa-at"
        />
        <FormInput
          label="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={error.password}
          name="password"
          type="password"
          icon="fa-key"
        />
        <Button
          disabled={onFetch}
          loading={onFetch}
          type="submit"
          buttonStyle="success"
        >
          Login
        </Button>
      </Form>
      <LinkTo>
        Don't have an account?<Link href="/register">Register now!</Link>
      </LinkTo>
    </Container>
  );
};

export default Login;

import { useContext, useState } from "react";
import Login from "@/components/auth/login";
import onlyGuest from "@/components/HOC/only-guest";
import UserContext from "@/context/user";
import auth from "queries/auth";
import Head from "next/head";

const Validator = require("validatorjs");

interface ErrorState {
  email: string[];
  password: string[];
  [key: string]: string[];
}

// Interface to match what the Login component expects
interface LoginErrorProps {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<ErrorState>({ email: [], password: [] });

  const [onFetch, setOnFetch] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    let validation = new Validator(
      { email, password },
      {
        email: "required|email",
        password: "min:6",
      }
    );

    validation.passes(() => {
      setOnFetch(true);
      auth
        .login({ email, password })
        .then((response: { data: any }) => {
          setOnFetch(false);
          setUser(response.data);
        })
        .catch(({ response }: { response?: { data: ErrorState } }) => {
          setOnFetch(false);
          if (response) {
            setError(response.data);
          }
        });
    });

    validation.fails(() => {
      setError(validation.errors.errors);
    });
  };

  // Transform error state to match LoginErrorProps
  const transformedError: LoginErrorProps = {
    email: error.email.length > 0 ? error.email[0] : undefined,
    password: error.password.length > 0 ? error.password[0] : undefined,
  };

  return (
    <>
      <Head>
        <title>Welfare Data - Login</title>
      </Head>
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={transformedError}
        login={login}
        onFetch={onFetch}
      />
    </>
  );
};

export default onlyGuest(LoginPage);

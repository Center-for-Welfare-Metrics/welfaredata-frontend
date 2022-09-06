import { useContext, useState } from "react";
import Login from "@/components/auth/login";
import onlyGuest from "@/components/HOC/only-guest";
import UserContext from "@/context/user";
import auth from "queries/auth";
import Head from "next/head";

const Validator = require("validatorjs");

const LoginPage = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState({ email: [], password: [] });

  const [onFetch, setOnFetch] = useState(false);

  const { setUser } = useContext(UserContext);

  const login = (event) => {
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
        .then((response) => {
          setOnFetch(false);
          setUser(response.data);
        })
        .catch(({ response }) => {
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
        error={error}
        login={login}
        onFetch={onFetch}
      />
    </>
  );
};

export default onlyGuest(LoginPage);

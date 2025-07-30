import Register from "../../components/auth/register";
import onlyGuest from "@/components/HOC/only-guest";
import auth from "queries/auth";
import { useContext, useEffect, useState, FormEvent } from "react";
import UserContext from "@/context/user";

import { passwordStrength as checkPasswordStrength } from "check-password-strength";
import Head from "next/head";
import { PasswordStrength } from "@/components/miscellaneous/strong-password-bar";
import { useRouter } from "next/router";

const Validator = require("validatorjs");

type ErrorType = {
  [key: string]: string[];
};

// Define a type for password strength values from check-password-strength

const RegisterPage = () => {
  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [password_confirmation, setPasswordConfirmation] = useState<string>("");

  const [error, setError] = useState<ErrorType>({});

  const [onFetch, setOnFetch] = useState<boolean>(false);

  const [registrationCode, setRegistrationCode] = useState<string>("");

  const { setUser } = useContext(UserContext);

  const router = useRouter();

  const [passwordStrength, setPasswordStrength] = useState<
    PasswordStrength | ""
  >("");

  useEffect(() => {
    if (password) {
      // Cast the string value to the PasswordStrengthValue type
      const strength = checkPasswordStrength(password)
        .value as PasswordStrength;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength("");
    }
  }, [password]);

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordStrength === "Weak") {
      setError({ password: ["Password too weak!"] });
    } else {
      let validation = new Validator(
        { name, email, password, password_confirmation },
        {
          email: "required|email",
          password: "min:6|confirmed|max:32|required",
          name: "required",
        }
      );

      validation.passes(() => {
        setOnFetch(true);
        auth
          .register({
            name,
            email,
            password,
            password_confirmation,
            registrationCode,
          })
          .then((response) => {
            setOnFetch(false);
            setUser(response.data);
          })
          .catch((error) => {
            console.error(error);
            setOnFetch(false);
          });
      });

      validation.fails(() => {
        setError(validation.errors.errors);
      });
    }
  };

  return (
    <>
      <Head>
        <title>Welfare Data - Register</title>
      </Head>
      <Register
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        registrationCode={registrationCode}
        setRegistrationCode={setRegistrationCode}
        password_confirmation={password_confirmation}
        setPasswordConfirmation={setPasswordConfirmation}
        error={error}
        register={register}
        onFetch={onFetch}
        passwordStrength={passwordStrength as any}
      />
    </>
  );
};

export default onlyGuest(RegisterPage);

// const Unamed = () => <ErrorPage statusCode={404} />;

// export default Unamed;

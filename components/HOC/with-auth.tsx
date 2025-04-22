import { useContext, useEffect } from "react";
import Router from "next/router";
import UserContext from "@/context/user";
import Head from "next/head";
import { NextPage } from "next";
import { ComponentType } from "react";

const withAuth = <P extends object>(
  Page: ComponentType<P> & { getInitialProps?: (ctx: any) => Promise<P> }
): NextPage<P> => {
  const Auth = (props: P) => {
    const { user } = useContext(UserContext);

    useEffect(() => {
      if (!user) {
        Router.push("/");
      }
    }, [user]);

    if (user) {
      return (
        <>
          <Head>
            <title>Welfare Data - Auth Area</title>
          </Head>
          <Page {...props} />
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  if (Page.getInitialProps) {
    Auth.getInitialProps = Page.getInitialProps;
  }

  return Auth as NextPage<P>;
};

export default withAuth;

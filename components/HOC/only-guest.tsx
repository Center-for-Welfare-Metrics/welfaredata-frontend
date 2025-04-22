import { useContext, useEffect } from "react";
import Router from "next/router";
import UserContext from "@/context/user";
import { NextPage } from "next";
import { ComponentType } from "react";

const onlyGuest = <P extends object>(Page: ComponentType<P>): NextPage<P> => {
  const Guest = (props: P) => {
    const { user } = useContext(UserContext);

    useEffect(() => {
      if (user) {
        Router.push("/admin");
      }
    }, [user]);

    if (user) {
      return <div>Loading...</div>;
    } else {
      return <Page {...props} />;
    }
  };

  return Guest as NextPage<P>;
};

export default onlyGuest;

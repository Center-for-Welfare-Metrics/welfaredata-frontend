import Link from "next/link";
import { Container, Name } from "./nav-item-styled";
import Router from "next/router";
import React from "react";
import type { Route } from "nextjs-routes";

interface INavItem {
  name: string;
  route: Route["pathname"];
}

const NavItem = ({ name, route }: INavItem) => {
  return (
    <>
      <Link
        //@ts-ignore
        href={{
          pathname: route,
        }}
        style={{
          height: "fit-content",
        }}
      >
        <Container>
          <Name
            $isCurrentRoute={Router.pathname.startsWith(
              Router.basePath + route
            )}
          >
            {name}
          </Name>
        </Container>
      </Link>
    </>
  );
};

export default React.memo(NavItem);

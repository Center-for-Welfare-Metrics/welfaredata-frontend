import NavItem from "./nav-item";
import React from "react";
import UserContext from "@/context/user";
import { useContext } from "react";
import {
  Containter,
  LogOut,
  NavItems,
  UserName,
  UserSection,
} from "./index-styled";
import { NavItens } from "./nav-map";
import { ThemeToggler } from "../ThemeToggler";
import { FlexRow } from "../desing-components/Flex";
import { useNavBar } from "@/context/useNavBar/NavBarProvider";

const NavBar = () => {
  const { user, logOut } = useContext(UserContext);

  const { loggedInNavBarRef } = useNavBar();

  return (
    <Containter id="main-nav-menu" ref={loggedInNavBarRef}>
      <NavItems>
        {NavItens.map((nav_item) => (
          <React.Fragment key={`${nav_item.name}_${nav_item.route}`}>
            {nav_item.auth ? (
              user && (
                <NavItem
                  route={nav_item.route}
                  name={nav_item.name}
                  key={nav_item.route}
                />
              )
            ) : (
              <NavItem
                route={nav_item.route}
                name={nav_item.name}
                key={nav_item.route}
              />
            )}
          </React.Fragment>
        ))}
      </NavItems>

      <FlexRow gap={2}>
        <ThemeToggler />
        {user && (
          <UserSection>
            <UserName>user: {user.name.split(" ")[0]}</UserName>
            <LogOut onClick={logOut}>logout</LogOut>
          </UserSection>
        )}
      </FlexRow>
    </Containter>
  );
};

export default React.memo(NavBar);

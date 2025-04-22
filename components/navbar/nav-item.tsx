import Link from "next/link";
import { Container, Name, Childrens, Children } from "./nav-item-styled";
import Router from "next/router";
import React, { useCallback, useRef } from "react";
import { Popper } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { useDetectClickOutside } from "@/utils/hooks/useDetectClickOutside";

interface NavItemChild {
  name: string;
  href: string;
  reload?: boolean;
}

interface INavItem {
  children: NavItemChild[];
  name: string;
  prefix: string;
}

const NavItem = ({ children, name, prefix }: INavItem) => {
  const [active, setActive] = React.useState(false);

  const navItemRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  const sort_children = (a: NavItemChild, b: NavItemChild) => {
    if (Router.pathname.includes(prefix)) {
      let full_url_a = prefix + a.href;
      let full_url_b = prefix + b.href;
      if (Router.pathname.includes(full_url_a)) {
        return -1;
      } else if (Router.pathname.includes(full_url_b)) {
        return 1;
      }
    }
    return 1;
  };

  useDetectClickOutside({
    element: navItemRef.current,
    onClickOutSide: () => setActive(false),
    enabled: active,
  });

  return (
    <>
      <Container onClick={toggle}>
        <Name
          ref={navItemRef}
          $active={active}
          $isCurrentRoute={Router.pathname.startsWith(Router.basePath + prefix)}
        >
          {name}
        </Name>
      </Container>
      <Popper
        open={active}
        anchorEl={navItemRef.current}
        style={{
          zIndex: zIndex.modal + 1,
        }}
        placement="bottom-start"
      >
        <Childrens>
          {children.sort(sort_children).map((item_children) =>
            item_children.reload ? (
              <Children
                href={prefix + item_children.href}
                $isCurrentRoute={Router.pathname.includes(
                  prefix + item_children.href
                )}
              >
                {item_children.name}
              </Children>
            ) : (
              <Link
                passHref={true}
                key={item_children.href}
                href={prefix + item_children.href}
              >
                <Children
                  $isCurrentRoute={Router.pathname.includes(
                    prefix + item_children.href
                  )}
                >
                  {item_children.name}
                </Children>
              </Link>
            )
          )}
        </Childrens>
      </Popper>
    </>
  );
};

export default React.memo(NavItem);

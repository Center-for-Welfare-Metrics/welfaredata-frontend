import styled from "styled-components";
import { FlexRow } from "../desing-components/Flex";
import { Text } from "../Text";
import { ArrowRight } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import React from "react";
import { ThemeToggler } from "../ThemeToggler";
import { useWhereIs } from "@/utils/hooks/useWhereIs";
import { Package, Target, Wind } from "react-feather";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDevice } from "@/utils/hooks/useDevice";
import { media } from "styles/media";
import { useNavBar } from "@/context/useNavBar/NavBarProvider";

const items = ["species", "modules", "production"] as const;

type Item = (typeof items)[number];

const LabelMap: Record<Item, string> = {
  species: "Species",
  modules: "Modules",
  production: "Production Systems",
};

const IconMap: Record<
  Item,
  React.ComponentType<{ size: number; color: string }>
> = {
  species: Wind,
  modules: Package,
  production: Target,
};

export const PublicNavbarNavigation = () => {
  const { isHomePage, isExactPath } = useWhereIs();

  const { isMobile } = useDevice();

  const { pathname, slug } = useParams<{
    pathname: string | undefined;
    slug: string | undefined;
  }>();

  const { setPublicNavBarRef } = useNavBar();

  const checkIfItemIsActive = (item: Item) => {
    if (item === "species") {
      return isHomePage();
    }

    if (item === "modules") {
      return isExactPath("/[pathname]");
    }

    if (item === "production") {
      return isExactPath("/[pathname]/[slug]");
    }

    return false;
  };

  const checkIfItemIsHighlighted = (item: Item) => {
    if (item === "species") {
      return (
        isExactPath("/[pathname]") ||
        isExactPath("/[pathname]/[slug]") ||
        isExactPath("/[pathname]/[slug]/[processogram]")
      );
    }

    if (item === "modules") {
      return (
        isExactPath("/[pathname]/[slug]") ||
        isExactPath("/[pathname]/[slug]/[processogram]")
      );
    }

    if (item === "production") {
      return isExactPath("/[pathname]/[slug]/[processogram]");
    }

    return false;
  };

  const getItemColor = (item: Item) => {
    if (checkIfItemIsActive(item)) {
      return ThemeColors.blue;
    }
    if (checkIfItemIsHighlighted(item)) {
      return ThemeColors.green;
    }
    return ThemeColors.grey_300;
  };

  const Icon = ({ item }: { item: Item }) => {
    const IconComponent = IconMap[item];

    if (!IconComponent) {
      return <></>;
    }

    return <IconComponent size={22} color={getItemColor(item)} />;
  };

  const renderNavigationItem = (item: Item, children: React.ReactNode) => {
    if (item === "species") {
      if (checkIfItemIsHighlighted(item)) {
        return (
          <LinkContainer
            href={{
              pathname: "/",
            }}
          >
            {children}
          </LinkContainer>
        );
      }
    } else if (item === "modules") {
      if (checkIfItemIsHighlighted(item) && pathname) {
        return (
          <LinkContainer
            href={{
              pathname: "/[pathname]",
              query: { pathname },
            }}
          >
            {children}
          </LinkContainer>
        );
      }
    } else if (item === "production") {
      if (checkIfItemIsHighlighted(item) && pathname && slug) {
        return (
          <LinkContainer
            href={{
              pathname: "/[pathname]/[slug]",
              query: { pathname, slug },
            }}
          >
            {children}
          </LinkContainer>
        );
      }
    }

    return children;
  };

  return (
    <Container ref={setPublicNavBarRef}>
      <FlexRow gap={1.5} align="center" justify="flex-start">
        {items.map((item, index) => (
          <React.Fragment key={item}>
            {renderNavigationItem(
              item,
              <Item>
                <Icon item={item} />
                {!isMobile && (
                  <Text
                    variant="body2"
                    fontWeight="700"
                    customColor={getItemColor(item)}
                  >
                    {LabelMap[item]}
                  </Text>
                )}
              </Item>
            )}

            {items.length - 1 > index && <ArrowRight size={18} />}
          </React.Fragment>
        ))}
      </FlexRow>
      <ThemeToggler />
    </Container>
  );
};

const Item = styled(FlexRow)``;

const Container = styled(FlexRow)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  padding: 2rem;
  border-bottom: 1px solid ${ThemeColors.grey_100};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: color-mix(in srgb, ${ThemeColors.black} 50%, transparent);
  backdrop-filter: blur(10px);

  ${media.up.medium`
    width: 100vw;
    overflow: auto;
    padding: 1rem;
  `}
`;

const LinkContainer = styled(Link)`
  position: relative;
  text-decoration: none;

  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

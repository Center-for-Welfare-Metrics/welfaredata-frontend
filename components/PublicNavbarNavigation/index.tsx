import styled from "styled-components";
import { FlexRow } from "../desing-components/Flex";
import { Text } from "../Text";
import { ArrowRight } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import React from "react";
import { ThemeToggler } from "../ThemeToggler";
import { useWhereIs } from "@/utils/hooks/useWhereIs";

const items = ["Species", "Modules", "Production"];

export const PublicNavbarNavigation = () => {
  const { isHomePage, isExactPath } = useWhereIs();

  const checkIfItemIsActive = (item: string) => {
    if (item === "Species") {
      return isHomePage();
    }

    if (item === "Modules") {
      return isExactPath("/[pathname]");
    }

    if (item === "Production") {
      return isExactPath("/[pathname]/[id]");
    }

    return false;
  };

  const checkIfItemIsHighlighted = (item: string) => {
    if (item === "Species") {
      return isExactPath("/[pathname]") || isExactPath("/[pathname]/[id]");
    }

    if (item === "Modules") {
      return isExactPath("/[pathname]/[id]");
    }

    return false;
  };

  const getItemColor = (item: string) => {
    if (checkIfItemIsActive(item)) {
      return ThemeColors.blue;
    }
    if (checkIfItemIsHighlighted(item)) {
      return ThemeColors.green;
    }
    return ThemeColors.grey_300;
  };

  return (
    <Container>
      <FlexRow gap={1.5} align="center" justify="flex-start">
        {items.map((item, index) => (
          <React.Fragment key={item}>
            <Item>
              <RoundedBox
                style={{
                  borderColor: getItemColor(item),
                }}
              >
                <Text
                  variant="body2"
                  customColor={getItemColor(item)}
                  style={{
                    height: "22px",
                  }}
                >
                  {index + 1}
                </Text>
              </RoundedBox>
              <Text
                variant="body2"
                fontWeight="700"
                customColor={getItemColor(item)}
              >
                {item}
              </Text>
            </Item>
            {items.length - 1 > index && <ArrowRight size={18} />}
          </React.Fragment>
        ))}
      </FlexRow>
      <ThemeToggler />
    </Container>
  );
};

const RoundedBox = styled.div`
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${ThemeColors.grey_300};
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

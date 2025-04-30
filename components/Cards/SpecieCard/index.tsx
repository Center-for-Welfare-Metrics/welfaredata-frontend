import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { SpecieCardSize } from "./const";

type Props = {
  _id: string;
  name: string;
  pathname: string;
  image_url: string | undefined;
};

export const SpecieCard = ({ _id, name, pathname, image_url }: Props) => {
  return (
    <Link
      href={{
        pathname: "/admin/species/[id]",
        query: {
          id: _id,
        },
      }}
      style={{
        textDecoration: "none",
      }}
    >
      <Container
        style={
          image_url
            ? {
                backgroundImage: `url(${image_url})`,
              }
            : undefined
        }
      >
        <Info>
          <FlexColumn gap={0}>
            <Text variant="body2">{name}</Text>
            <Text variant="body2">/{pathname}</Text>
          </FlexColumn>
        </Info>
      </Container>
    </Link>
  );
};

const A = styled.a`
  text-decoration: none;
`;

const Info = styled.div`
  background-color: ${transparentize(0.3, ThemeColors.black)};
`;

const Container = styled.div`
  width: ${SpecieCardSize.width}px;
  height: ${SpecieCardSize.height}px;
  border-radius: 4px;
  border: 1px solid ${ThemeColors.deep_blue};
  padding: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.blue};
  }
`;

import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  _id: string;
  name: string;
  pathname: string;
  image_url: string | undefined;
};

export const SpecieCard = ({ _id, name, pathname, image_url }: Props) => {
  return (
    <Link passHref href={`/admin/species/${_id}`}>
      <A>
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
            <FlexColumn>
              <Text variant="body2">{name}</Text>
              <Text variant="body2">/{pathname}</Text>
            </FlexColumn>
          </Info>
        </Container>
      </A>
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
  width: 200px;
  height: 150px;
  border-radius: 4px;
  border: 1px solid ${ThemeColors.deep_blue};
  padding: 1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  transition: border 0.25s ease-in-out;

  &:hover {
    border: 1px solid ${ThemeColors.blue};
  }
`;

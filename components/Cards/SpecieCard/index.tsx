import { FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  _id: string;
  name: string;
  pathname: string;
  image_url: string;
};

export const SpecieCard = ({ _id, name, pathname, image_url }: Props) => {
  return (
    <Link href={`admin/species/${_id}`}>
      <Container
        style={{
          backgroundImage: `url(${image_url})`,
        }}
      >
        <Info>
          <Text variant="body2">{name}</Text>
          <Text variant="body2">{pathname}</Text>
        </Info>
      </Container>
    </Link>
  );
};

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${transparentize(0.3, ThemeColors.black)};
`;

const Container = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
`;

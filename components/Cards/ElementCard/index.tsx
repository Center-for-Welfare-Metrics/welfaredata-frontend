import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import { transparentize } from "polished";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ElementCardSize } from "./const";
import { useMemo } from "react";
import { ElementStatus } from "types/elements";

type Props = {
  _id: string;
  name: string;
  status: ElementStatus;
  image_url: string | undefined;
};

export const ElementCard = ({ _id, name, image_url, status }: Props) => {
  const statusColor = useMemo(() => {
    if (status === "error") return ThemeColors.red;

    if (status === "ready") return ThemeColors.green;

    if (status === "processing") return ThemeColors.yellow;

    if (status === "generating") return ThemeColors.gray;
  }, [status]);

  const statusText = useMemo(() => {
    switch (status) {
      case "processing":
        return "Processing elements";
      case "ready":
        return "Ready to use";
      case "error":
        return "Error";
      case "generating":
        return "Generating AI content";
      default:
        return "";
    }
  }, [status]);

  return (
    <Link
      href={{
        pathname: "/admin/elements/[id]",
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
            <Text variant="body2" customColor={statusColor}>
              Status : {statusText}
            </Text>
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
  width: ${ElementCardSize.width}px;
  height: ${ElementCardSize.height}px;
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

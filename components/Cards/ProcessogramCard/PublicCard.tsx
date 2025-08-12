import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import Link from "next/link";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { ProcessogramCardSize } from "./const";
import { useMemo, useState } from "react";
import { Target } from "react-feather";
import { ImageMosaic } from "@/components/ImageMosaic";
import { useTheme } from "next-themes";

type Props = {
  _id: string;
  name: string;
  pathname: string;
  slug: string;
  processogramSlug: string;
  description: string | undefined;
  image_url:
    | {
        url: string;
        theme: "dark" | "light";
      }
    | undefined;
};

export const PublicProcessogramCard = ({
  _id,
  pathname,
  slug,
  processogramSlug,
  name,
  image_url,
  description,
}: Props) => {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = () => {
    setIsMouseOver(true);
  };

  const onMouseLeave = () => {
    setIsMouseOver(false);
  };

  const href = useMemo(() => {
    return {
      pathname: "/[pathname]/[slug]/[processogram]",
      query: {
        pathname,
        slug: slug,
        processogram: processogramSlug,
      },
    };
  }, [slug, pathname]);

  return (
    <LinkContainer
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {image_url && (
        <MosaicWrapper>
          {" "}
          <ImageMosaic urls={[image_url]} enableAnimation={isMouseOver} />
        </MosaicWrapper>
      )}
      <Container>
        <InfoWrapper gap={0.5} $isDarkMode={isDarkMode}>
          <Info>
            <FlexColumn gap={0}>
              <FlexRow justify="flex-start" align="center">
                <Target size={16} color={ThemeColors.grey_900} />
                <Text variant="body1" fontWeight="700">
                  {name}
                </Text>
              </FlexRow>
              <Text
                variant="body2"
                customColor={ThemeColors.grey_600}
                title={description}
                maxLines={2}
              >
                {description}
              </Text>
            </FlexColumn>
          </Info>
        </InfoWrapper>
      </Container>
    </LinkContainer>
  );
};

const MosaicWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 8px;
  background-color: transparent;
`;

const Info = styled.div``;

type InfoWrapperProps = {
  $isDarkMode: boolean;
};

const InfoWrapper = styled(FlexColumn)<InfoWrapperProps>`
  padding: 1rem;
  background-color: color-mix(
    in srgb,
    ${ThemeColors.black},
    transparent ${({ $isDarkMode }) => ($isDarkMode ? "10%" : "5%")}
  );
  backdrop-filter: blur(2px);
`;

const Container = styled.div`
  width: 100%;
  height: ${ProcessogramCardSize.height * 2}px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  transition: border 0.25s ease-in-out;
`;

const LinkContainer = styled(Link)`
  position: relative;
  text-decoration: none;
  border: 1px solid ${ThemeColors.grey_300};
  border-radius: 8px;

  overflow: hidden;

  transition: transform 0.25s ease-in-out;

  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
  }

  width: 100%;

  @media (min-width: 2000px) {
    width: calc(50% - 0.5rem);
  }

  @media (min-width: 3000px) {
    width: calc(33% - 0.5rem);
  }
`;

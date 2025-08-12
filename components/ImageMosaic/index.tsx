import React from "react";
import styled from "styled-components";
import { FlexColumn, FlexRow } from "../desing-components/Flex";
import { FloatingImage } from "./components/FloatingImage";
import { ThemeColors } from "theme/globalStyle";

type ImageMosaicProps = {
  urls: { url: string; theme: "light" | "dark" }[];
  className?: string;
  enableAnimation?: boolean;
};

export const ImageMosaic: React.FC<ImageMosaicProps> = ({
  urls,
  className,
  enableAnimation,
}: ImageMosaicProps) => {
  const urlsLength = urls.length;

  const getThemeStyle = (theme: "light" | "dark") => ({
    backgroundColor:
      theme === "dark"
        ? ThemeColors.fixedBackgroundBlack
        : ThemeColors.fixedBackgroundWhite,
  });

  if (urlsLength === 0) return <></>;

  if (urlsLength === 1)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0].url}
          style={getThemeStyle(urls[0].theme)}
          alt="Single Image"
        />
      </MosaicContainer>
    );

  if (urlsLength === 2)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0].url}
          alt="Image 1"
          style={{
            width: "50%",
            ...getThemeStyle(urls[0].theme),
          }}
        />
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[1].url}
          alt="Image 2"
          style={{
            width: "50%",
            ...getThemeStyle(urls[1].theme),
          }}
        />
      </MosaicContainer>
    );

  if (urlsLength === 3)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0].url}
          alt="Image 1"
          style={{
            width: "50%",
            height: "100%",
            ...getThemeStyle(urls[0].theme),
          }}
        />
        <FlexColumn width="50%" height="100%">
          <FloatingImage
            enableAnimation={enableAnimation}
            src={urls[1].url}
            alt="Image 2"
            style={{
              width: "100%",
              height: "50%",
              ...getThemeStyle(urls[1].theme),
            }}
          />
          <FloatingImage
            enableAnimation={enableAnimation}
            src={urls[2].url}
            alt="Image 3"
            style={{
              width: "100%",
              height: "50%",
              ...getThemeStyle(urls[2].theme),
            }}
          />
        </FlexColumn>
      </MosaicContainer>
    );

  if (urlsLength >= 4)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0].url}
          alt="Image 1"
          style={{
            width: "50%",
            height: "100%",
            ...getThemeStyle(urls[0].theme),
          }}
        />
        <FlexColumn width="50%" height="100%">
          <FloatingImage
            enableAnimation={enableAnimation}
            src={urls[1].url}
            alt="Image 2"
            style={{
              width: "100%",
              height: "50%",
              ...getThemeStyle(urls[1].theme),
            }}
          />
          <FlexRow width="100%" height="50%">
            <FloatingImage
              enableAnimation={enableAnimation}
              src={urls[2].url}
              alt="Image 3"
              style={{
                width: "50%",
                height: "100%",
                ...getThemeStyle(urls[2].theme),
              }}
            />
            <FloatingImage
              enableAnimation={enableAnimation}
              src={urls[3].url}
              alt="Image 4"
              style={{
                width: "50%",
                height: "100%",
                ...getThemeStyle(urls[3].theme),
              }}
            />
          </FlexRow>
          {urlsLength > 4 && (
            <FloatingImage
              enableAnimation={enableAnimation}
              src={urls[4].url}
              alt="Image 5"
              style={{
                width: "100%",
                height: "50%",
                ...getThemeStyle(urls[4].theme),
              }}
            />
          )}
        </FlexColumn>
      </MosaicContainer>
    );

  return <></>;
};

const MosaicContainer = styled(FlexRow)`
  transition: opacity 0.25s ease-in-out;
`;

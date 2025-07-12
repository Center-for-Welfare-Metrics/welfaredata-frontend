import React from "react";
import styled from "styled-components";
import { FlexColumn, FlexRow } from "../desing-components/Flex";
import { FloatingImage } from "./components/FloatingImage";

type ImageMosaicProps = {
  urls: string[];
  className?: string;
  enableAnimation?: boolean;
};

export const ImageMosaic: React.FC<ImageMosaicProps> = ({
  urls,
  className,
  enableAnimation,
}: ImageMosaicProps) => {
  const urlsLength = urls.length;

  if (urlsLength === 0) return <></>;

  if (urlsLength === 1)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0]}
          alt="Single Image"
        />
      </MosaicContainer>
    );

  if (urlsLength === 2)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0]}
          alt="Image 1"
          style={{
            width: "50%",
          }}
        />
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[1]}
          alt="Image 2"
          style={{
            width: "50%",
          }}
        />
      </MosaicContainer>
    );

  if (urlsLength === 3)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <FloatingImage
          enableAnimation={enableAnimation}
          src={urls[0]}
          alt="Image 1"
          style={{
            width: "50%",
            height: "100%",
          }}
        />
        <FlexColumn width="50%" height="100%">
          <FloatingImage
            enableAnimation={enableAnimation}
            src={urls[1]}
            alt="Image 2"
            style={{
              width: "100%",
              height: "50%",
            }}
          />
          <FloatingImage
            enableAnimation={enableAnimation}
            src={urls[2]}
            alt="Image 3"
            style={{
              width: "100%",
              height: "50%",
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
          src={urls[0]}
          alt="Image 1"
          style={{
            width: "50%",
            height: "100%",
          }}
        />
        <FlexColumn width="50%" height="100%">
          <FloatingImage
            enableAnimation={enableAnimation}
            src={urls[1]}
            alt="Image 2"
            style={{
              width: "100%",
              height: "50%",
            }}
          />
          <FlexRow width="100%" height="50%">
            <FloatingImage
              enableAnimation={enableAnimation}
              src={urls[2]}
              alt="Image 3"
              style={{
                width: "50%",
                height: "100%",
              }}
            />
            <FloatingImage
              enableAnimation={enableAnimation}
              src={urls[3]}
              alt="Image 4"
              style={{
                width: "50%",
                height: "100%",
              }}
            />
          </FlexRow>
          {urlsLength > 4 && (
            <FloatingImage
              enableAnimation={enableAnimation}
              src={urls[4]}
              alt="Image 5"
              style={{
                width: "100%",
                height: "50%",
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

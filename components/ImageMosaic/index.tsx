// ImageMosaic.tsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { FlexColumn, FlexRow } from "../desing-components/Flex";

type ImageMosaicProps = {
  urls: string[];
  className: string;
};

export const ImageMosaic: React.FC<ImageMosaicProps> = ({
  urls,
  className,
}: ImageMosaicProps) => {
  const urlsLength = urls.length;

  if (urlsLength === 0) return <></>;

  if (urlsLength === 1)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <Image src={urls[0]} alt="Single Image" />
      </MosaicContainer>
    );

  if (urlsLength === 2)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <Image
          src={urls[0]}
          style={{
            width: "50%",
          }}
        />
        <Image
          src={urls[1]}
          style={{
            width: "50%",
          }}
        />
      </MosaicContainer>
    );

  if (urlsLength === 3)
    return (
      <MosaicContainer gap={0} height="100%" className={className}>
        <Image
          src={urls[0]}
          style={{
            width: "50%",
            height: "100%",
          }}
        />
        <FlexColumn width="50%" height="100%">
          <Image
            src={urls[1]}
            style={{
              width: "100%",
              height: "50%",
            }}
          />
          <Image
            src={urls[2]}
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
        <Image
          src={urls[0]}
          style={{
            width: "50%",
            height: "100%",
          }}
        />
        <FlexColumn width="50%" height="100%">
          <Image
            src={urls[1]}
            style={{
              width: "100%",
              height: "50%",
            }}
          />
          <FlexRow width="100%" height="50%">
            <Image
              src={urls[2]}
              style={{
                width: "50%",
                height: "100%",
              }}
            />
            <Image
              src={urls[3]}
              style={{
                width: "50%",
                height: "100%",
              }}
            />
          </FlexRow>
          {urlsLength > 4 && (
            <Image
              src={urls[4]}
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

const BouncingAnimation = keyframes`
 0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  15% {
    transform: translate(-2%, 1%) rotate(-0.5deg);
  }
  30% {
    transform: translate(3%, -1%) rotate(0.6deg);
  }
  45% {
    transform: translate(-1%, -2%) rotate(-0.3deg);
  }
  60% {
    transform: translate(1.5%, 2.5%) rotate(0.4deg);
  }
  75% {
    transform: translate(-2.5%, 1%) rotate(0.7deg);
  }
  90% {
    transform: translate(1.5%, -1.5%) rotate(-0.2deg);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  transform-origin: center;
  backface-visibility: hidden;
  will-change: transform;
  animation: ${BouncingAnimation} 8s infinite;
  pointer-events: none;
`;

const MosaicContainer = styled(FlexRow)`
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
`;

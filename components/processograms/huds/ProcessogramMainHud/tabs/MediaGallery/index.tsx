import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn } from "components/desing-components/Flex";
import { Play } from "react-feather";
import {
  SearchedImageResult,
  useGetImages,
} from "@/api/react-query/public/useGetImages";
import { ProcessogramHierarchy } from "types/processogram";

type Props = {
  hierarchy: ProcessogramHierarchy[];
};

export const MediaGallery = ({ hierarchy }: Props) => {
  const handleMediaClick = (item: SearchedImageResult) => {
    console.log("Media clicked:", item);
    // Handle media item click (open modal, play video, etc.)
  };

  const { data } = useGetImages({ hierarchy });

  const images = useMemo(() => {
    return data?.images ?? [];
  }, [data]);

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <Text variant="body2" color="white" opacity={0.8}>
          Browse through images and videos
        </Text>

        <MediaGrid>
          {images?.map((item) => (
            <MediaItem key={item.link} onClick={() => handleMediaClick(item)}>
              <MediaImage src={item.image.thumbnailLink} alt={item.title} />
              {/* {item.type === "video" && (
                <PlayIconOverlay>
                  <Play size={24} color="white" />
                </PlayIconOverlay>
              )} */}
              <MediaTitle>
                <Text variant="caption" color="white" textElipsis>
                  {item.title}
                </Text>
              </MediaTitle>
            </MediaItem>
          ))}
        </MediaGrid>
      </FlexColumn>
    </MediaContainer>
  );
};

const MediaContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 1rem;
  padding-inline-end: 0;
  box-sizing: border-box;
`;

const MediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaItem = styled.div`
  position: relative;
  width: calc(33% - 1rem);
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;

  ${MediaImage} {
    transition: transform 0.2s ease;
  }

  &:hover {
    ${MediaImage} {
      transform: scale(1.2);
    }
  }
`;

const PlayIconOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MediaTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 8px;
  color: white;
`;

export default MediaGallery;

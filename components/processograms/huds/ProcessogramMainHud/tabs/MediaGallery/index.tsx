import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn } from "components/desing-components/Flex";
import { Play } from "react-feather";
import {
  SearchedImageResult,
  useGetImages,
} from "@/api/react-query/public/useGetImages";
import { ProcessogramHierarchy } from "types/processogram";
import { ImageModal } from "./components/ImageModal";
import { Portal, Skeleton } from "@mui/material";

type Props = {
  hierarchy: ProcessogramHierarchy[];
};

export const MediaGallery = ({ hierarchy }: Props) => {
  const [selectedImage, setSelectedImage] =
    useState<SearchedImageResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMediaClick = (item: SearchedImageResult) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const { data, isLoading } = useGetImages({ hierarchy });

  const images = useMemo(() => {
    return data?.images ?? [];
  }, [data]);

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <Text variant="body2" color="white" opacity={0.8}>
          {isLoading ? "Loading images..." : "Browse through images"}
        </Text>

        <MediaGrid>
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <SkeletonItem key={index}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
                  />
                </SkeletonItem>
              ))
            : images?.map((item) => (
                <MediaItem
                  key={item.link}
                  onClick={() => handleMediaClick(item)}
                >
                  <MediaImage src={item.image.thumbnailLink} alt={item.title} />
                  <MediaTitle>
                    <Text variant="caption" color="white" textElipsis>
                      {item.title}
                    </Text>
                  </MediaTitle>
                </MediaItem>
              ))}
        </MediaGrid>
      </FlexColumn>
      <Portal>
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      </Portal>
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

const SkeletonItem = styled.div`
  width: calc(33% - 1rem);
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
`;

export default MediaGallery;

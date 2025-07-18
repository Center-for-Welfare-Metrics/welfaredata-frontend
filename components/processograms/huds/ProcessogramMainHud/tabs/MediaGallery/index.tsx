import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn } from "components/desing-components/Flex";
import {
  SearchedImageResult,
  useGetPublicImages,
} from "@/api/react-query/public/useGetImages";
import { ImageModal } from "./components/ImageModal";
import { Portal } from "@mui/material";
import { ImagesList } from "./components/ImagesList";

type Props = {
  processogramId: string;
  currentElement: string;
};

export const MediaGallery = ({ processogramId, currentElement }: Props) => {
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

  const { data: processogramImages, isLoading } =
    useGetPublicImages(processogramId);

  const images: SearchedImageResult[] = useMemo((): SearchedImageResult[] => {
    if (!processogramImages?.images) return [];

    const allImages = processogramImages.images[currentElement] ?? [];

    return allImages.map((image) => ({
      image: {
        thumbnailLink: image.url,
      },
      link: image.url,
      title: image.title,
    }));
  }, [processogramImages, currentElement]);

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <Text variant="body2" color="white" opacity={0.8}>
          {isLoading ? "Loading images..." : "Browse through images"}
        </Text>
        {images.length > 0 ? (
          <ImagesList
            images={images}
            isLoading={isLoading}
            onClick={handleMediaClick}
          />
        ) : (
          <FlexColumn align="center" justify="center">
            <Text variant="body2" color="white" opacity={0.5}>
              No images found for this processogram.
            </Text>
          </FlexColumn>
        )}
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

export default MediaGallery;

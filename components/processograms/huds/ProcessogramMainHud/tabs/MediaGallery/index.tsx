import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn } from "components/desing-components/Flex";
import {
  SearchedImageResult,
  useGetSearchedImages,
} from "@/api/react-query/public/useGetImages";
import { ProcessogramHierarchy } from "types/processogram";
import { ImageModal } from "./components/ImageModal";
import { Portal } from "@mui/material";
import { ImagesList } from "./components/ImagesList";

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

  const { data, isLoading } = useGetSearchedImages({ hierarchy });

  const images = useMemo(() => {
    return data?.images ?? [];
  }, [data]);

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <Text variant="body2" color="white" opacity={0.8}>
          {isLoading ? "Loading images..." : "Browse through images"}
        </Text>
        <ImagesList
          images={images}
          isLoading={isLoading}
          onClick={handleMediaClick}
        />
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

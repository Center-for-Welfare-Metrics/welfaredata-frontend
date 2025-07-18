import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn, FlexRow } from "components/desing-components/Flex";
import {
  SearchedImageResult,
  useGetSearchedImages,
} from "@/api/react-query/public/useGetImages";
import { ProcessogramHierarchy } from "types/processogram";
import { Portal, Switch } from "@mui/material";
import {
  useAddProcessogramImage,
  useDeleteProcessogramImage,
  useGetImages,
  useUpdateAutoSearch,
} from "@/api/react-query/processogram-images/useGetImages";
import { ImagesList } from "@/components/processograms/huds/ProcessogramMainHud/tabs/MediaGallery/components/ImagesList";
import { ImageModal } from "@/components/processograms/huds/ProcessogramMainHud/tabs/MediaGallery/components/ImageModal";

type Props = {
  processogramId: string;
  currentElement: string;
};

export const Gallery = ({ processogramId, currentElement }: Props) => {
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

  const { data: processogramImages, isLoading } = useGetImages(processogramId);

  const addProcessogramImage = useAddProcessogramImage();

  const deleteProcessogramImage = useDeleteProcessogramImage();

  const updateAutoSearch = useUpdateAutoSearch();

  const images: SearchedImageResult[] = useMemo((): SearchedImageResult[] => {
    if (!processogramImages?.images) return [];

    const allImages = processogramImages.images[currentElement] ?? [];

    return allImages.map((image) => ({
      image: {
        thumbnailLink: image.url,
      },
      link: image.url,
      title: "",
    }));
  }, [processogramImages, currentElement]);

  const imagesSet = useMemo(() => {
    const set = new Set<string>();
    for (const image of images) {
      set.add(image.link);
    }

    return set;
  }, [images]);

  const handleDeleteImage = async (item: SearchedImageResult) => {
    deleteProcessogramImage.mutateAsync({
      processogram_id: processogramId,
      key: currentElement,
      url: item.link,
    });
  };

  const handleAddImage = async (item: SearchedImageResult) => {
    await addProcessogramImage.mutateAsync({
      processogram_id: processogramId,
      key: currentElement,
      url: item.link,
    });
  };

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <FlexRow justify="space-between" width="100%">
          <Text variant="body2" color="white" opacity={0.8}>
            Images Gallery {"(Public available)"}
          </Text>
        </FlexRow>
        <ImagesList
          images={images}
          isLoading={isLoading}
          onClickAdd={handleAddImage}
          onDelete={handleDeleteImage}
          selectedImages={imagesSet}
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
  padding-inline-end: 0;
  box-sizing: border-box;
`;

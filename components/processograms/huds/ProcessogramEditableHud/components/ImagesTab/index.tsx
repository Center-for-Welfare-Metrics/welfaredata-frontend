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
import { ImagesList } from "../../../ProcessogramMainHud/tabs/MediaGallery/components/ImagesList";
import { ImageModal } from "../../../ProcessogramMainHud/tabs/MediaGallery/components/ImageModal";
import {
  useAddProcessogramImage,
  useDeleteProcessogramImage,
  useGetImages,
  useUpdateAutoSearch,
} from "@/api/react-query/processogram-images/useGetImages";

type Props = {
  hierarchy: ProcessogramHierarchy[];
  processogramId: string;
  currentElement: string;
};

export const ImagesTab = ({
  hierarchy,
  processogramId,
  currentElement,
}: Props) => {
  const [selectedImage, setSelectedImage] =
    useState<SearchedImageResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [localAutoSearch, setLocalAutoSearch] = useState(false);

  const handleMediaClick = (item: SearchedImageResult) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const { data: processogramImages } = useGetImages(processogramId);

  const { data, isLoading } = useGetSearchedImages(
    { hierarchy },
    !!processogramImages?.autoSearch
  );

  const searchedImages = useMemo(() => {
    return data?.images ?? [];
  }, [data]);

  const addProcessogramImage = useAddProcessogramImage();

  const deleteProcessogramImage = useDeleteProcessogramImage();

  const updateAutoSearch = useUpdateAutoSearch();

  const images = useMemo(() => {
    if (processogramImages?.images) {
      return processogramImages.images[currentElement] ?? [];
    }

    return [];
  }, [processogramImages, currentElement]);

  const imagesSet = useMemo(() => {
    const set = new Set<string>();
    for (const image of images) {
      set.add(image.url);
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

  const handleAutoSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalAutoSearch(e.target.checked);
    await updateAutoSearch.mutateAsync({
      id: processogramId,
      autoSearch: e.target.checked,
    });
  };

  useEffect(() => {
    if (processogramImages?.autoSearch !== undefined) {
      setLocalAutoSearch(processogramImages.autoSearch);
    }
  }, [processogramImages?.autoSearch]);

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <FlexRow justify="space-between" width="100%">
          <Text variant="body2" color="white" opacity={0.8}>
            Auto search for images
          </Text>
          <Switch
            checked={localAutoSearch}
            onChange={handleAutoSearchChange}
            color="primary"
          />
        </FlexRow>
        <ImagesList
          images={searchedImages}
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
  padding: 1rem;
  padding-inline-end: 0;
  box-sizing: border-box;
`;

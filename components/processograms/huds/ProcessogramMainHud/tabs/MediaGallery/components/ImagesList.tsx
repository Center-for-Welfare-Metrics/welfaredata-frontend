import { SearchedImageResult } from "@/api/react-query/public/useGetImages";
import styled from "styled-components";
import { Skeleton, Tooltip } from "@mui/material";
import { Text } from "@/components/Text";
import { CheckCircle, Plus, Trash } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import { FlexColumn } from "@/components/desing-components/Flex";

type Props = {
  images: SearchedImageResult[];
  isLoading: boolean;
  onClick: (item: SearchedImageResult) => void;
  onClickAdd?: (item: SearchedImageResult) => void;
  onClickNewImage?: () => void;
  onDelete?: (item: SearchedImageResult) => void;
  selectedImages?: Set<string>;
};

export const ImagesList = ({
  images,
  isLoading,
  onClick,
  onClickAdd,
  onClickNewImage,
  onDelete,
  selectedImages,
}: Props) => {
  return (
    <MediaGrid>
      {onClickNewImage && (
        <AddMediaItem onClick={onClickNewImage}>
          <FlexColumn align="center" justify="center">
            <Text
              variant="body2"
              color={"white"}
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              Add New Image
            </Text>
            <Plus size={16} />
          </FlexColumn>
        </AddMediaItem>
      )}
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
            <MediaItem key={item.link} onClick={() => onClick(item)}>
              <MediaImage src={item.image.thumbnailLink} alt={item.title} />
              <MediaTitle>
                <Text variant="caption" color="white" textElipsis>
                  {item.title}
                </Text>
              </MediaTitle>
              {selectedImages?.has(item.link) && (
                <Tooltip title="Selected and visible">
                  <SelectedContainer>
                    <CheckCircle
                      size={16}
                      color={ThemeColors.green}
                      strokeWidth={3}
                    />
                  </SelectedContainer>
                </Tooltip>
              )}
              {onDelete && selectedImages?.has(item.link) && (
                <Tooltip title="Delete image">
                  <DeleteContainer
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item);
                    }}
                  >
                    <Trash size={16} color={ThemeColors.red} strokeWidth={3} />
                  </DeleteContainer>
                </Tooltip>
              )}
              {onClickAdd && !selectedImages?.has(item.link) && (
                <Tooltip title="Add to processogram">
                  <AddContainer
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickAdd(item);
                    }}
                  >
                    <Plus
                      size={16}
                      color={ThemeColors.fixedBackgroundWhite}
                      strokeWidth={3}
                    />
                  </AddContainer>
                </Tooltip>
              )}
            </MediaItem>
          ))}
    </MediaGrid>
  );
};

const BaseIconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const DeleteContainer = styled(BaseIconContainer)`
  bottom: 0;
  left: 0;
  background-color: color-mix(in srgb, ${ThemeColors.red} 65%, transparent);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`;

const SelectedContainer = styled(BaseIconContainer)`
  top: 0;
  right: 0;
  background-color: color-mix(in srgb, ${ThemeColors.black} 65%, transparent);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    transform: none;
  }
`;

const AddContainer = styled(BaseIconContainer)`
  top: 0;
  right: 0;
  background-color: color-mix(
    in srgb,
    ${ThemeColors.fixedBackgroundBlack} 65%,
    transparent
  );
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const SkeletonItem = styled.div`
  width: calc(33% - 1rem);
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
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

  ${DeleteContainer} {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  &:hover {
    ${DeleteContainer} {
      opacity: 1;
      pointer-events: auto;
    }
  }

  ${AddContainer} {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  &:hover {
    ${AddContainer} {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const AddMediaItem = styled(MediaItem)`
  background-color: ${ThemeColors.grey_100};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${ThemeColors.grey_200};
  }
`;

const MediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

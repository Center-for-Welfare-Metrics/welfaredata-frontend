import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "react-feather";
import { SearchedImageResult } from "@/api/react-query/public/useGetImages";
import { ClipLoader } from "react-spinners";
import { ThemeColors } from "theme/globalStyle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: SearchedImageResult | null;
};

export const ImageModal = ({ isOpen, onClose, image }: Props) => {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);

  // Reset loading state when image changes
  useEffect(() => {
    if (image) {
      setIsFullImageLoaded(false);

      // Preload the full image
      const fullImage = new Image();
      fullImage.onload = () => {
        setIsFullImageLoaded(true);
      };
      fullImage.src = image.link;
    }
  }, [image]);

  if (!isOpen || !image) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <CloseButton onClick={handleCloseClick}>
          <X size={24} color="white" />
        </CloseButton>
        <ImageContainer>
          <FullScreenImage
            src={isFullImageLoaded ? image.link : image.image.thumbnailLink}
            alt={image.title}
            $isFullImage={isFullImageLoaded}
            onError={(e) => {
              // Fallback to thumbnail if full image fails to load
              const target = e.target as HTMLImageElement;
              target.src = image.image.thumbnailLink;
              setIsFullImageLoaded(false);
            }}
          />
          {!isFullImageLoaded && (
            <LoadingContainer>
              <ClipLoader color={ThemeColors.deep_blue} size={32} loading />
            </LoadingContainer>
          )}
        </ImageContainer>
        <ImageTitle>{image.title}</ImageTitle>
      </ModalContent>
    </ModalBackdrop>
  );
};

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
`;

type FullScreenImageProps = {
  $isFullImage: boolean;
};

const FullScreenImage = styled.img<FullScreenImageProps>`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isFullImage ? 1 : 0.8)};
`;

const ImageTitle = styled.div`
  margin-top: 1rem;
  color: white;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  max-width: 600px;
`;

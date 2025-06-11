import React from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn, FlexRow } from "components/desing-components/Flex";
import { Play } from "react-feather";

// Mock data
const mockMediaItems = [
  {
    id: 1,
    type: "image",
    url: "https://picsum.photos/150/150?random=1",
    title: "Image 1",
  },
  {
    id: 2,
    type: "video",
    url: "https://picsum.photos/150/150?random=2",
    title: "Video 1",
  },
  {
    id: 3,
    type: "image",
    url: "https://picsum.photos/150/150?random=3",
    title: "Image 2",
  },
  {
    id: 4,
    type: "image",
    url: "https://picsum.photos/150/150?random=4",
    title: "Image 3",
  },
  {
    id: 5,
    type: "video",
    url: "https://picsum.photos/150/150?random=5",
    title: "Video 2",
  },
  {
    id: 6,
    type: "image",
    url: "https://picsum.photos/150/150?random=6",
    title: "Image 4",
  },
  {
    id: 7,
    type: "video",
    url: "https://picsum.photos/150/150?random=7",
    title: "Video 3",
  },
  {
    id: 8,
    type: "image",
    url: "https://picsum.photos/150/150?random=8",
    title: "Image 5",
  },
  {
    id: 9,
    type: "video",
    url: "https://picsum.photos/150/150?random=9",
    title: "Video 4",
  },
  {
    id: 10,
    type: "image",
    url: "https://picsum.photos/150/150?random=10",
    title: "Image 6",
  },
  {
    id: 11,
    type: "image",
    url: "https://picsum.photos/150/150?random=11",
    title: "Image 7",
  },
  {
    id: 12,
    type: "video",
    url: "https://picsum.photos/150/150?random=12",
    title: "Video 5",
  },
  {
    id: 13,
    type: "image",
    url: "https://picsum.photos/150/150?random=13",
    title: "Image 8",
  },
  {
    id: 14,
    type: "video",
    url: "https://picsum.photos/150/150?random=14",
    title: "Video 6",
  },
  {
    id: 15,
    type: "image",
    url: "https://picsum.photos/150/150?random=15",
    title: "Image 9",
  },
  {
    id: 16,
    type: "image",
    url: "https://picsum.photos/150/150?random=16",
    title: "Image 10",
  },
  {
    id: 17,
    type: "video",
    url: "https://picsum.photos/150/150?random=17",
    title: "Video 7",
  },
  {
    id: 18,
    type: "image",
    url: "https://picsum.photos/150/150?random=18",
    title: "Image 11",
  },
];

export const MediaGallery = () => {
  const handleMediaClick = (item: (typeof mockMediaItems)[0]) => {
    console.log("Media clicked:", item);
    // Handle media item click (open modal, play video, etc.)
  };

  return (
    <MediaContainer>
      <FlexColumn gap={1} align="flex-start">
        <Text variant="body2" color="white" opacity={0.8}>
          Browse through images and videos
        </Text>

        <MediaGrid>
          {mockMediaItems.map((item) => (
            <MediaItem key={item.id} onClick={() => handleMediaClick(item)}>
              <MediaImage src={item.url} alt={item.title} />
              {item.type === "video" && (
                <PlayIconOverlay>
                  <Play size={24} color="white" />
                </PlayIconOverlay>
              )}
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
  box-sizing: border-box;
`;

const MediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  width: calc(50% - 1rem);
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

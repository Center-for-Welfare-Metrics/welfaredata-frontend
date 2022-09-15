import FullScreenView from "@/components/data_entry/form/tabs/media/media_file/full-screen-view";
import { IMedia } from "@/utils/processogram";
import { useEffect } from "react";
import { useState } from "react";
import { MediaList, MediaStyled, FullScreenImage } from "./media-tab-styled";
import React from "react";
import { useContext } from "react";
import ProcessogramContext from "@/context/processogram";
import MediaFile from "@/components/data_entry/form/tabs/media/media_file/media-file";

export interface IMediaComponent {
  media: IMedia;
  onClick(event: Event, index: number): void;
  index: number;
}

export interface IMediaTab {
  medias: IMedia[];
  ref_medias: IMedia[];
}

const MediaTab = ({ medias, ref_medias }: IMediaTab) => {
  const { setMediasViewer } = useContext(ProcessogramContext);

  const mediaClick = (event: Event, media: IMedia) => {
    if (!media.type.includes("video") && media.type !== "youtube") {
      event.stopPropagation();
      const allMedias = [...(medias || []), ...(ref_medias || [])];
      const onlyImages = allMedias.filter(
        (media) => !media.type.includes("video")
      );
      const index = onlyImages.findIndex((m) => m._id === media._id);
      setMediasViewer({ medias: onlyImages, index: index });
    }
  };

  return (
    <MediaList>
      {[...(medias || []), ...(ref_medias || [])].map((media, index) => (
        <MediaFile
          key={media?._id}
          media={media}
          disabledContext
          onClick={(e) => mediaClick(e, media)}
          onlyImage
        />
      ))}
    </MediaList>
  );
};

export default React.memo(MediaTab);

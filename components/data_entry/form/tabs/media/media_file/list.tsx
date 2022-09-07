import MediaFile from "./media-file";
import { Container } from "./list-styled";

import React from "react";
import { IMedia } from "@/utils/processogram";

interface IMediaFileList {
  medias: IMedia[];
  onDelete(media: IMedia): void;
}

const MediaFileList = ({ medias, onDelete }: IMediaFileList) => {
  return (
    <Container>
      {medias.map((media) => (
        <MediaFile onDelete={onDelete} media={media} key={media?._id} />
      ))}
    </Container>
  );
};

export default MediaFileList;

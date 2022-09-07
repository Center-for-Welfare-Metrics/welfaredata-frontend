import ContextMenu from "@/context/context-menu";
import { DefaultEventComportamentOnContextMenuOpen } from "@/utils/context-menu";
import { useContext, useState } from "react";
import FullScreenView from "./full-screen-view";
import {
  Image,
  FullImage,
  Video,
  Thumb,
  Container,
  DialogMiniImage,
  DialogMiniThumb,
  DialogVideo,
} from "./media-file-styled";
import Dialog from "@/components/common/dialog/dialog";
import { IMedia } from "@/utils/processogram";
import { PlayCircleFilled } from "@material-ui/icons";
import styled from "styled-components";
export interface IMediaFile {
  media: IMedia;
  disabledContext?: boolean;
  onDelete?(media: IMedia): void;
  onClick?(e: Event): void;
  onlyImage?: boolean;
}

const MediaFile = ({
  media,
  onDelete,
  disabledContext,
  onClick,
  onlyImage,
}: IMediaFile) => {
  const [open, toggle] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { setContextMenu } = useContext(ContextMenu);

  const onContextMenu = (event: MouseEvent) => {
    if (!disabledContext) {
      DefaultEventComportamentOnContextMenuOpen(event);
      setContextMenu({
        open: true,
        type: "options",
        options: [
          {
            text: "Open",
            icon: "push-pin",
            onClick: openImageFullScreen,
            type: "primary",
          },
          {
            text: "Delete",
            icon: "eliminar",
            onClick: () => setOpenDeleteDialog(true),
            type: "danger",
          },
        ],
        x: event.clientX,
        y: event.clientY,
        optionTarget: media,
        position: "mouse-oriented",
      });
    }
  };

  const openImageFullScreen = () => {
    if (onlyImage) {
      if (!media.type.includes("video")) {
        return;
      }
    }
    toggle(true);
  };

  return (
    <>
      <Container onContextMenu={onContextMenu} onClick={onClick}>
        {media?.type?.includes("image") && (
          <Image
            onClick={openImageFullScreen}
            style={{ backgroundImage: `url(${media?.url})` }}
          />
        )}

        {media?.type?.includes("video") && (
          <Thumb>
            <VideoOverlay />
            <IconWrapper>
              <PlayCircleFilled />
            </IconWrapper>
            <Video onClick={openImageFullScreen}>
              <source src={media?.url + "#t=0.1"} type={media?.type}></source>
            </Video>
          </Thumb>
        )}
        <Dialog
          isOpen={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(null)}
          confirmText="Delete"
          title={
            <>
              Do you really want to remove <br />
              {media?.type?.includes("image") && (
                <DialogMiniImage
                  style={{ backgroundImage: `url(${media?.url})` }}
                />
              )}
              {media?.type?.includes("video") && (
                <DialogMiniThumb>
                  <DialogVideo>
                    <source
                      src={media?.url + "#t=0.1"}
                      type={media?.type}
                    ></source>
                  </DialogVideo>
                </DialogMiniThumb>
              )}
              "{media?.originalName}"?
            </>
          }
          subtitle="this action cannot be undone"
          onConfirm={() => {
            onDelete(media);
          }}
          type="danger"
        />
      </Container>
      {open && (
        <FullScreenView
          onContextMenu={DefaultEventComportamentOnContextMenuOpen}
          onClose={() => toggle(false)}
        >
          {media?.type.includes("image") && <FullImage src={media?.url} />}
          {media?.type.includes("video") && (
            <Video autoPlay controls>
              <source src={media?.url} type={media?.type}></source>
            </Video>
          )}
        </FullScreenView>
      )}
    </>
  );
};

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
`;

export default MediaFile;

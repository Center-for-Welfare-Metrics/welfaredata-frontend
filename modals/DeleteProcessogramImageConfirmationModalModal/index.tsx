import { ModalContainer } from "modals/ModalContainer";
import { useDeleteProcessogramImageConfirmationModalModal } from "./hooks";
import { Button } from "components/Button";
import { Text } from "components/Text";
import styled from "styled-components";
import { FlexColumn } from "@/components/desing-components/Flex";
import { useDeleteProcessogramImage } from "@/api/react-query/processogram-images/useGetImages";
import { SearchedImageResult } from "@/api/react-query/public/useGetImages";

export type DeleteProcessogramImageConfirmationModalModalProps = {
  onClose: () => void;
  processogramId: string;
  currentElement: string;
  item: SearchedImageResult;
};

const DeleteProcessogramImageConfirmationModalModal = ({
  onClose,
  currentElement,
  processogramId,
  item,
}: DeleteProcessogramImageConfirmationModalModalProps) => {
  const deleteProcessogramImage = useDeleteProcessogramImage();

  const handleDeleteImage = async () => {
    await deleteProcessogramImage.mutateAsync({
      processogram_id: processogramId,
      key: currentElement,
      url: item.link,
    });

    onClose();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Delete Image"
      centerTitle
      height="350px"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <Content>
        <FlexColumn gap={1} mt={1}>
          <Text variant="body1" align="center">
            Are you sure you want to delete{" "}
            {item.title ? `the image "${item.title}"` : "this image"}?
          </Text>
          <Text variant="body2" align="center" color="gray">
            This action cannot be undone. This image will be permanently
            deleted.
          </Text>
        </FlexColumn>
        <ButtonContainer>
          <ButtonWrapper onClick={handleDeleteImage}>
            <Button
              buttonStyle="danger"
              loading={deleteProcessogramImage.isPending}
              type="button"
            >
              Delete
            </Button>
          </ButtonWrapper>

          <ButtonWrapper onClick={onClose}>
            <Button buttonStyle="primary" type="button">
              Cancel
            </Button>
          </ButtonWrapper>
        </ButtonContainer>
      </Content>
    </ModalContainer>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: space-between;
  height: calc(100% - 3rem);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 0;
  cursor: pointer;
`;

export const DeleteProcessogramImageConfirmationModalModalWrapper = () => {
  const [modalProps, setModalProps] =
    useDeleteProcessogramImageConfirmationModalModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return (
    <DeleteProcessogramImageConfirmationModalModal
      {...modalProps}
      onClose={onClose}
    />
  );
};

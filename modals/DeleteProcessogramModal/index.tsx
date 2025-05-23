import { useCallback, useEffect } from "react";
import { ModalContainer } from "modals/ModalContainer";
import { useDeleteProcessogramModal } from "./hooks";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { useDeleteProcessogram } from "queries/react-query/processograms/useProcessograms";
import styled from "styled-components";

export type DeleteProcessogramModalProps = {
  onClose: () => void;
  processogramId: string;
  processogramName: string;
  onDelete?: () => void;
};

const DeleteProcessogramModal = ({
  onClose,
  processogramId,
  processogramName,
  onDelete,
}: DeleteProcessogramModalProps) => {
  const deleteProcessogram = useDeleteProcessogram();

  const handleDelete = async () => {
    await deleteProcessogram.mutateAsync({
      params: {
        id: processogramId,
      },
    });
    onClose();
    onDelete?.();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Delete Processogram"
      style={{
        height: "200px",
      }}
    >
      <Content>
        <Text variant="body1" align="center">
          Are you sure you want to delete the processogram{" "}
          <strong>{processogramName}</strong>?
        </Text>
        <Text variant="body2" align="center" color="gray" mt={1}>
          This action cannot be undone. This processogram will be permanently
          deleted.
        </Text>

        <ButtonContainer>
          <ButtonWrapper onClick={handleDelete}>
            <Button
              buttonStyle="danger"
              loading={deleteProcessogram.isPending}
              disabled={deleteProcessogram.isPending}
              type="button"
            >
              Delete
            </Button>
          </ButtonWrapper>

          <ButtonWrapper onClick={onClose}>
            <Button
              buttonStyle="primary"
              disabled={deleteProcessogram.isPending}
              type="button"
            >
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

export const DeleteProcessogramModalWrapper = () => {
  const [modalProps, setModalProps] = useDeleteProcessogramModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <DeleteProcessogramModal {...modalProps} onClose={onClose} />;
};

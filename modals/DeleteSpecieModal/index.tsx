import styled from "styled-components";
import { ModalContainer } from "modals/ModalContainer";
import { useDeleteSpecieModal } from "./hooks";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useDeleteSpecie } from "@/api/react-query/species/useSpecies";
import { FlexColumn } from "@/components/desing-components/Flex";

export type DeleteSpecieModalProps = {
  onClose: () => void;
  specieId: string;
  specieName: string;
  onDelete?: () => void;
};

const DeleteSpecieModal = ({
  onClose,
  specieId,
  specieName,
  onDelete,
}: DeleteSpecieModalProps) => {
  const deleteSpecie = useDeleteSpecie();

  const handleDelete = async () => {
    await deleteSpecie.mutateAsync({
      params: {
        specie_id: specieId,
      },
    });
    onClose();
    onDelete?.();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Delete Specie"
      centerTitle
      height="250px"
    >
      <Content>
        <FlexColumn gap={1} mt={1}>
          <Text variant="body1" align="center">
            Are you sure you want to delete the specie{" "}
            <strong>{specieName}</strong>?
          </Text>
          <Text variant="body2" align="center" color="gray">
            This action cannot be undone. All data associated with this specie
            will be permanently deleted.
          </Text>
        </FlexColumn>
        <ButtonContainer>
          <ButtonWrapper onClick={handleDelete}>
            <Button
              buttonStyle="danger"
              loading={deleteSpecie.isPending}
              disabled={deleteSpecie.isPending}
              type="button"
            >
              Delete
            </Button>
          </ButtonWrapper>

          <ButtonWrapper onClick={onClose}>
            <Button
              buttonStyle="primary"
              disabled={deleteSpecie.isPending}
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

export const DeleteSpecieModalWrapper = () => {
  const [modalProps, setModalProps] = useDeleteSpecieModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <DeleteSpecieModal {...modalProps} onClose={onClose} />;
};

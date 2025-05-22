import styled from "styled-components";
import { ModalContainer } from "modals/ModalContainer";
import { useDeleteProductionModuleModal } from "./hooks";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { useDeleteProductionModule } from "queries/react-query/production-modules/useProductionModule";

export type DeleteProductionModuleModalProps = {
  onClose: () => void;
  productionModuleId: string;
  productionModuleName: string;
  onDelete?: () => void;
};

const DeleteProductionModuleModal = ({
  onClose,
  productionModuleId,
  productionModuleName,
  onDelete,
}: DeleteProductionModuleModalProps) => {
  const deleteProductionModule = useDeleteProductionModule();

  const handleDelete = async () => {
    await deleteProductionModule.mutateAsync({
      params: {
        id: productionModuleId,
      },
    });
    onClose();
    onDelete?.();
  };

  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title="Delete Production Module"
      style={{
        height: "200px",
      }}
    >
      <Content>
        <Text variant="body1" align="center">
          Are you sure you want to delete the production module{" "}
          <strong>{productionModuleName}</strong>?
        </Text>
        <Text variant="body2" align="center" color="gray" mt={1}>
          This action cannot be undone. All data associated with this production
          module will be permanently deleted.
        </Text>

        <ButtonContainer>
          <ButtonWrapper onClick={handleDelete}>
            <Button
              buttonStyle="danger"
              loading={deleteProductionModule.isPending}
              disabled={deleteProductionModule.isPending}
              type="button"
            >
              Delete
            </Button>
          </ButtonWrapper>

          <ButtonWrapper onClick={onClose}>
            <Button
              buttonStyle="primary"
              disabled={deleteProductionModule.isPending}
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

export const DeleteProductionModuleModalWrapper = () => {
  const [modalProps, setModalProps] = useDeleteProductionModuleModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <DeleteProductionModuleModal {...modalProps} onClose={onClose} />;
};

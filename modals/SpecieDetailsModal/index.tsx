import { ModalContainer } from "modals/ModalContainer";
import { useSpecieDetailsModal } from "./hooks";
import { FlexColumn } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";

export type SpecieDetailsModalProps = {
  onClose: () => void;
  specie: {
    description: string;
  };
};

const SpecieDetailsModal = ({ onClose, specie }: SpecieDetailsModalProps) => {
  return (
    <ModalContainer open={true} onClose={onClose} title="Species Details">
      <FlexColumn gap={2} mt={2}>
        <section>
          <Text variant="h3">Description</Text>
          <FlexColumn gap={0}>
            <Text>{specie.description}</Text>
          </FlexColumn>
        </section>
      </FlexColumn>
    </ModalContainer>
  );
};

export const SpecieDetailsModalWrapper = () => {
  const [modalProps, setModalProps] = useSpecieDetailsModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <SpecieDetailsModal {...modalProps} onClose={onClose} />;
};

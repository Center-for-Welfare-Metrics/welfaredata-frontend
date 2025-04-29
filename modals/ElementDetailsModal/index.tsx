import { filesize } from "filesize";
import { ModalContainer } from "modals/ModalContainer";
import { useElementDetailsModal } from "./hooks";
import { FlexColumn } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import dayjs from "dayjs";

type ElementDetails = {
  originalSize: number;
  finalSize: number;
  elementsCount: number;
  createdAt: string;
};

export type ElementDetailsModalProps = {
  onClose: () => void;
  element: ElementDetails;
};

const ElementDetailsModal = ({
  onClose,
  element,
}: ElementDetailsModalProps) => {
  return (
    <ModalContainer open={true} onClose={onClose} title="Details">
      <FlexColumn gap={2} mt={2}>
        <section>
          <Text variant="h3">Optimization</Text>
          <FlexColumn gap={0}>
            <Text>Original Size: {filesize(element.originalSize)}</Text>
            <Text>Final Size: {filesize(element.finalSize)}</Text>
            <Text>
              Optimization:{" "}
              {Math.round(
                ((element.originalSize - element.finalSize) /
                  element.originalSize) *
                  100
              )}
              %
            </Text>
          </FlexColumn>
        </section>
        <section>
          <Text variant="h3">Information</Text>
          <FlexColumn gap={0}>
            <Text>
              This processogram has {element.elementsCount} unique elements
            </Text>
            <Text>
              Created at {dayjs(element.createdAt).format("MM/DD/YYYY")}
            </Text>
          </FlexColumn>
        </section>
      </FlexColumn>
    </ModalContainer>
  );
};

export const ElementDetailsModalWrapper = () => {
  const [modalProps, setModalProps] = useElementDetailsModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <ElementDetailsModal {...modalProps} onClose={onClose} />;
};

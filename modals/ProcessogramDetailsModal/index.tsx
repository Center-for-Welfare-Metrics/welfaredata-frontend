import { filesize } from "filesize";
import { ModalContainer } from "modals/ModalContainer";
import { useElementDetailsModal } from "./hooks";
import { FlexColumn } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import dayjs from "dayjs";

type ProcessogramDetails = {
  original_size_dark: number | undefined;
  final_size_dark: number | undefined;
  original_size_light: number | undefined;
  final_size_light: number | undefined;
  elementsCount: number;
  createdAt: string;
};

export type ProcessogramDetailsModalProps = {
  onClose: () => void;
  element: ProcessogramDetails;
};

const ProcessogramDetailsModal = ({
  onClose,
  element,
}: ProcessogramDetailsModalProps) => {
  const totalOriginalSize =
    (element.original_size_dark || 0) + (element.original_size_light || 0);
  const totalFinalSize =
    (element.final_size_dark || 0) + (element.final_size_light || 0);
  const optimizationPercentage =
    totalOriginalSize > 0
      ? Math.round(
          ((totalOriginalSize - totalFinalSize) / totalOriginalSize) * 100
        )
      : 0;

  return (
    <ModalContainer open={true} onClose={onClose} title="Details">
      <FlexColumn gap={2} mt={2}>
        <section>
          <Text variant="h3">Optimization</Text>
          <FlexColumn gap={0}>
            <Text>Original Size: {filesize(totalOriginalSize)}</Text>
            <Text>Final Size: {filesize(totalFinalSize)}</Text>
            <Text>Optimization: {optimizationPercentage}%</Text>
            {element.original_size_dark && element.final_size_dark && (
              <Text>
                Dark theme: {filesize(element.original_size_dark)} →{" "}
                {filesize(element.final_size_dark)}
              </Text>
            )}
            {element.original_size_light && element.final_size_light && (
              <Text>
                Light theme: {filesize(element.original_size_light)} →{" "}
                {filesize(element.final_size_light)}
              </Text>
            )}
          </FlexColumn>
        </section>
        <section>
          <Text variant="h3">Information</Text>
          <FlexColumn gap={0}>
            <Text>
              This processogram has {element.elementsCount} unique elements with
              generated data
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

export const ProcessogramDetailsModalWrapper = () => {
  const [modalProps, setModalProps] = useElementDetailsModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <ProcessogramDetailsModal {...modalProps} onClose={onClose} />;
};

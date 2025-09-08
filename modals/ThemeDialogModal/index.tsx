import { ModalContainer } from "modals/ModalContainer";
import { useThemeDialogModal } from "./hooks";
import styled from "styled-components";
import { FlexColumn } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";

export type ThemeDialogModalProps = {
  onClose: () => void;
  title: string;
  message: string;
};

const ThemeDialogModal = ({
  onClose,
  title,
  message,
}: ThemeDialogModalProps) => {
  return (
    <ModalContainer
      open={true}
      onClose={onClose}
      title={title}
      centerTitle
      height="350px"
    >
      <Content>
        <FlexColumn gap={1} mt={1}>
          <Text variant="body2" align="center" color="gray">
            {message}
          </Text>
        </FlexColumn>
        <ButtonContainer>
          <ButtonWrapper onClick={onClose}>
            <Button buttonStyle="primary" type="button">
              Ok
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

export const ThemeDialogModalWrapper = () => {
  const [modalProps, setModalProps] = useThemeDialogModal();

  if (!modalProps) return null;

  const onClose = () => {
    setModalProps(null);
  };

  return <ThemeDialogModal {...modalProps} onClose={onClose} />;
};

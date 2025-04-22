import React from "react";
import Modal, { IModal } from "@/components/common/modal";
import { DangerButton, DefaultButton } from "../buttons/default-button-styled";
import { Container, SubTitle, Title, ActionButtons } from "./dialog-styled";

export type StyleTypes =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "default";

interface IDialog extends IModal {
  type: StyleTypes;
  onConfirm(): void;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  confirmText: string;
}

const Dialog = ({
  isOpen,
  onClose,
  clear,
  type,
  onConfirm,
  title,
  subtitle,
  confirmText,
}: IDialog) => {
  return (
    <Modal
      isDialog={true}
      type={type}
      isOpen={isOpen}
      onClose={onClose}
      clear={clear}
    >
      <Container type={type}>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <ActionButtons>
          <DangerButton onClick={onConfirm}>{confirmText}</DangerButton>
          <DefaultButton onClick={onClose}>Cancel</DefaultButton>
        </ActionButtons>
      </Container>
    </Modal>
  );
};

export default React.memo(Dialog);

import { useEffect, useState } from "react";
import { Container, FadedModalBackground } from "./modal-styled";
import React from "react";
import { StyleTypes } from "../dialog/dialog";

export interface IModal {
  onClose(evt?: any): void;
  isOpen: boolean;
  children?: React.ReactNode;
  clear?(): void;
  type?: StyleTypes;
  isDialog?: boolean;
  overflowY?: string;
}

const Modal = ({
  onClose,
  isOpen,
  children,
  clear,
  type = "primary",
  isDialog,
  overflowY = "auto",
}: IModal) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const [fadeOpen, setFadeOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInternalOpen(true);
      setTimeout(() => {
        setFadeOpen(true);
      }, 50);
    } else {
      setFadeOpen(false);
      setTimeout(() => {
        setInternalOpen(false);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!internalOpen) {
      if (clear) clear();
    }
  }, [internalOpen]);

  return internalOpen ? (
    <>
      <Container
        overflowY={overflowY}
        isDialog={!!isDialog}
        type={type}
        isOpen={fadeOpen}
      >
        {children}
      </Container>
      <FadedModalBackground isOpen={fadeOpen} onClick={onClose} />
    </>
  ) : (
    <></>
  );
};

export default Modal;

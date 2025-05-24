import React, { JSX, useRef } from "react";
import styled from "styled-components";
import { Modal, Box, BoxProps } from "@mui/material";
import { Minimize2, X } from "react-feather";
import { isEmpty } from "lodash";
import { Text } from "@/components/Text";
import { media } from "styles/media";
import { ThemeColors } from "theme/globalStyle";
import { FlexRow } from "@/components/desing-components/Flex";
import { useUnsavedChanges } from "@/utils/hooks/useUnsavedChanges";

type Props = {
  open: boolean;
  onClose: () => void;
  closeType?: "close" | "minimize" | "both";
  title?: JSX.Element | string;
  centerTitle?: boolean;
  titleWeigth?: string;
  description?: string | JSX.Element;
  closeButtonTop?: number;
  fullScreenOnMobile?: boolean;
  zIndex?: number;
  keyDisableEsc?: boolean;
  disableOverlay?: boolean;
  closeTooltip?: string;
  closeId?: string;
  unsavedChanges?: {
    enabled: boolean;
    message?: string;
  };
} & Omit<BoxProps, "title">;

export const ModalContainer: React.FC<Props> = ({
  open,
  onClose,
  closeType = "close",
  children,
  title,
  description,
  titleWeigth,
  closeButtonTop,
  fullScreenOnMobile,
  zIndex,
  maxWidth,
  keyDisableEsc,
  disableOverlay,
  closeTooltip,
  closeId,
  centerTitle,
  unsavedChanges,
  ...rest
}) => {
  const { triggerDialog } = useUnsavedChanges({
    enabled: !!unsavedChanges?.enabled,
    message: unsavedChanges?.message,
  });

  const handleTitle = () => {
    if (typeof title === "string" && !isEmpty(title.trim())) {
      return (
        <FlexRow justify={centerTitle ? "center" : "flex-start"}>
          <Text variant="h2" fontWeight={titleWeigth} align="center">
            {title}
          </Text>
        </FlexRow>
      );
    }
    return title;
  };

  // const iconColor = customTheme.icon[300];

  // const setConfirmActionModal = useSetConfirmActionModal();

  const handleDescription = () => {
    if (typeof description === "string" && !isEmpty(description.trim())) {
      return (
        <Text variant="body2" align="center">
          {description}
        </Text>
      );
    }

    return description;
  };

  const close = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (unsavedChanges?.enabled) {
      triggerDialog(onClose);
      return;
    }
    onClose();
  };

  return (
    <ModalStyled
      open={open}
      onClose={close}
      style={{
        zIndex: zIndex || 1300,
      }}
      disableEscapeKeyDown={keyDisableEsc}
    >
      <Wrapper
        width="800px"
        height="478px"
        padding={3}
        paddingY={6}
        $fullScreenOnMobile={fullScreenOnMobile}
        {...rest}
      >
        <CloseButton $closeButtonTop={closeButtonTop}>
          {(closeType === "minimize" || closeType === "both") && (
            <Minimize2
              cursor="pointer"
              onClick={close}
              size={24}
              color={ThemeColors.white}
            />
          )}
          {(closeType === "close" || closeType === "both") && (
            <X
              id={closeId}
              cursor="pointer"
              onClick={close}
              size={30}
              color={ThemeColors.white}
            />
          )}
        </CloseButton>
        {title && handleTitle()}
        {description && handleDescription()}
        {children}
      </Wrapper>
    </ModalStyled>
  );
};

type WrapperProps = {
  $fullScreenOnMobile?: boolean;
  $maxWidth?: string;
};

const Wrapper = styled(Box)<WrapperProps>`
  position: relative;
  background-color: ${ThemeColors.deep_blue};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  outline: transparent;
  border-radius: 8px;
  height: auto;
  ${media.up.iphone5`
		padding: 2rem;
	`}
  overflow: auto;
  max-width: ${({ $maxWidth }) => ($maxWidth ? $maxWidth : "98vw")};
  ${({ $fullScreenOnMobile }) =>
    !$fullScreenOnMobile
      ? media.up.medium`
      width:92%;
      padding: 1rem;
    `
      : media.up.medium`
      width: 100%;
      padding: 1rem;
      height: 100%;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    `}
`;

type CloseButtonProps = {
  $closeButtonTop?: number;
};

const CloseButton = styled.div<CloseButtonProps>`
  position: absolute;
  top: ${({ theme, $closeButtonTop }) => "1rem"};
  right: 1rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ModalStyled = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

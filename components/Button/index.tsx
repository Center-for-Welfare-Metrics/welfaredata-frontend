import styled, { css, keyframes } from "styled-components";
import { ClipLoader } from "react-spinners";

import { GetColorType } from "@/utils/theme";
import { ThemeColors } from "theme/globalStyle";

type ButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  buttonStyle?: "success" | "danger" | "primary" | "warning";
};

export const Button = ({
  children,
  loading,
  type,
  disabled,
  buttonStyle = "primary",
}: ButtonProps) => {
  const getButtonByStyle = () => {
    switch (buttonStyle) {
      case "success":
        return SuccessButton;
      case "danger":
        return DangerButton;
      case "warning":
        return WarningButton;
      default:
        return PrimaryButton;
    }
  };

  return (
    <Wrapper>
      <DefaultButton
        $loading={loading}
        type={type}
        disabled={disabled}
        as={getButtonByStyle()}
      >
        {children}
      </DefaultButton>
      {loading && (
        <LoadingContainer>
          <ClipLoader color={ThemeColors.deep_blue} size={20} loading />
        </LoadingContainer>
      )}
    </Wrapper>
  );
};

type DefaultButtonProps = {
  $loading?: boolean;
};

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DefaultButton = styled.button<DefaultButtonProps>`
  position: relative;
  background-color: ${GetColorType({ type: "default" })};
  color: white;
  border: 1px solid transparent;
  border-radius: 1rem;
  cursor: pointer;
  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
  outline: none;
  &:disabled {
    background-color: gray;
    pointer-events: none;
    cursor: not-allowed;
  }
  transition: transform 500ms;
  ${({ $loading }) =>
    $loading
      ? css`
          pointer-events: none;
          opacity: 0.5;
        `
      : ""}

  &:hover {
    border: 1px solid ${ThemeColors.white};
  }
`;

const shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;

const DangerButton = styled(DefaultButton)`
  background-color: ${GetColorType({ type: "danger" })};
  color: ${ThemeColors.white};

  &:hover {
    animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
`;

const PrimaryButton = styled(DefaultButton)`
  background-color: ${GetColorType({ type: "primary" })};
  color: ${ThemeColors.black};

  transition: background-color 250ms;

  &:hover {
    background-color: ${GetColorType({ type: "primary" })};
  }
`;

const SuccessButton = styled(DefaultButton)`
  background-color: ${GetColorType({ type: "success" })};

  &:hover {
    background-color: ${GetColorType({ type: "success" })};
  }
`;

const WarningButton = styled(DefaultButton)`
  background-color: ${GetColorType({ type: "warning" })};
  color: ${ThemeColors.black};

  &:hover {
    background-color: ${GetColorType({ type: "warning" })};
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin-top: 1rem;
`;

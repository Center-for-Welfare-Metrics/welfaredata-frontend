import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { ThemeColors } from "theme/globalStyle";

type LoadingWrapperProps = {
  loading?: boolean;
  children?: React.ReactNode;
  size?: number;
  color?: string;
  fullScreen?: boolean;
  height?: string;
  minHeight?: string;
};

export const LoadingWrapper = ({
  loading = false,
  children,
  size = 35,
  color = ThemeColors.deep_blue,
  fullScreen = false,
  height,
  minHeight = "200px",
}: LoadingWrapperProps) => {
  if (loading) {
    return (
      <>
        <ClipLoader color={color} size={size} loading />
      </>
    );
  }

  return <>{children}</>;
};

type LoadingContainerProps = {
  $fullScreen?: boolean;
  $height?: string;
  $minHeight?: string;
};

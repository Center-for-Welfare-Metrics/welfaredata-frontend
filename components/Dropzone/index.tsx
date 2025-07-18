import React, { useCallback, useMemo } from "react";
import { useDropzone, DropzoneOptions, Accept } from "react-dropzone";
import { Upload, X } from "react-feather";
import styled, { css } from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { Text } from "../Text";
import { FlexColumn } from "../desing-components/Flex";

interface DropzoneProps {
  onFileAccepted?: (file: File) => void;
  onFileRemoved?: () => void;
  onFileRejected?: (fileRejections: any[]) => void;
  maxFiles?: number;
  textContent?: React.ReactNode;
  currentFile?: File | null;
  accept?: Accept;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileAccepted,
  onFileRemoved,
  onFileRejected,
  textContent,
  maxFiles = 1,
  currentFile,
  accept = {
    "image/svg+xml": [".svg"],
  },
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted?.(acceptedFiles[0]);
      }

      if (rejectedFiles.length > 0 && onFileRejected) {
        onFileRejected(rejectedFiles);
      }
    },
    [onFileAccepted, onFileRejected]
  );

  const dropzoneOptions = useMemo<DropzoneOptions>(
    () => ({
      onDrop,
      maxFiles,
      accept,
    }),
    [onDrop, maxFiles]
  );

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFileRemoved) {
      onFileRemoved();
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone(dropzoneOptions);

  return (
    <div>
      <DropzoneActive
        {...getRootProps()}
        $isDragActive={isDragActive}
        $hasFile={!!currentFile}
      >
        <input {...getInputProps()} />
        <FlexColumn align="center">
          {textContent ? (
            <>
              {isDragActive ? (
                <>
                  <Text variant="body1" align="center">
                    Will replace the current SVG file with the new one.
                  </Text>
                </>
              ) : (
                textContent
              )}
            </>
          ) : (
            <>
              <Upload size={24} color={ThemeColors.white} />
              <Text variant="body1" align="center">
                {isDragActive
                  ? "Drop the SVG file here..."
                  : "Drag & drop an SVG file here, or click to select"}
              </Text>
            </>
          )}
        </FlexColumn>
        {!!currentFile && (
          <IconWrapper onClick={onClickDelete}>
            <X color={ThemeColors.grey_900} />
          </IconWrapper>
        )}
      </DropzoneActive>
      {fileRejections.length > 0 && (
        <ErrorText>
          Error: {fileRejections[0].errors[0].message}. Please upload a valid
          SVG file.
        </ErrorText>
      )}
    </div>
  );
};

const IconWrapper = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;

  &:hover {
    background-color: ${ThemeColors.grey_200};
  }
`;

type DropzoneContainerProps = {
  $hasFile: boolean;
};

const DropzoneContainer = styled.div<DropzoneContainerProps>`
  ${({ $hasFile }) =>
    $hasFile
      ? css`
          border: 2px solid ${ThemeColors.green};
        `
      : css`
          border: 2px dashed ${ThemeColors.grey_400};
        `}

  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 100px;
  width: 300px;

  &:hover {
    background-color: ${ThemeColors.grey_100};
  }
`;

type DropzoneActiveProps = {
  $isDragActive: boolean;
};

const DropzoneActive = styled(DropzoneContainer)<DropzoneActiveProps>`
  position: relative;

  ${({ $isDragActive }) =>
    $isDragActive &&
    css`
      border-color: ${ThemeColors.green};
      background-color: ${ThemeColors.green};
    `}

  ${IconWrapper} {
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    ${IconWrapper} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const ErrorText = styled.p`
  color: ${ThemeColors.red};
  font-size: 14px;
  margin-top: 8px;
`;

export default Dropzone;

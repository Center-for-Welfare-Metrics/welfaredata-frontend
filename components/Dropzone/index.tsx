import React, { useCallback, useMemo } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Upload } from "react-feather";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";
import { Text } from "../Text";
import { FlexColumn } from "../desing-components/Flex";

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  onFileRejected?: (fileRejections: any[]) => void;
  maxFiles?: number;
  textContent?: React.ReactNode;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileAccepted,
  onFileRejected,
  textContent,
  maxFiles = 1,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
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
      accept: {
        "image/svg+xml": [".svg"],
      },
    }),
    [onDrop, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone(dropzoneOptions);

  return (
    <div>
      <DropzoneActive {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        <FlexColumn align="center">
          {textContent ? (
            textContent
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

const DropzoneContainer = styled.div`
  border: 2px dashed ${ThemeColors.grey_400};
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

const DropzoneActive = styled(DropzoneContainer)<{ isDragActive: boolean }>`
  border-color: ${(props) =>
    props.isDragActive ? ThemeColors.green : ThemeColors.grey_300};
  background-color: ${(props) =>
    props.isDragActive ? ThemeColors.green : "inherit"};
`;

const ErrorText = styled.p`
  color: ${ThemeColors.red};
  font-size: 14px;
  margin-top: 8px;
`;

export default Dropzone;

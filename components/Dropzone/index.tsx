import React, { useCallback, useMemo } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import styled from "styled-components";
import { ThemeColors } from "theme/globalStyle";

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  onFileRejected?: (fileRejections: any[]) => void;
  maxFiles?: number;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileAccepted,
  onFileRejected,
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
        <SVGIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </SVGIcon>
        <DropzoneText>
          {isDragActive
            ? "Drop the SVG file here..."
            : "Drag & drop an SVG file here, or click to select"}
        </DropzoneText>
        <DropzoneSubText>Only SVG files are accepted</DropzoneSubText>
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
  border: 2px dashed ${ThemeColors.blue};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${ThemeColors.gray};
  min-height: 200px;

  &:hover {
    background-color: ${`${ThemeColors.gray}0a`}; /* Primary color with 10% opacity */
  }
`;

const DropzoneActive = styled(DropzoneContainer)<{ isDragActive: boolean }>`
  border-color: ${(props) =>
    props.isDragActive ? ThemeColors.green : ThemeColors.white};
  background-color: ${(props) =>
    props.isDragActive ? `${ThemeColors.green}0a` : "inherit"};
`;

const DropzoneText = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: ${ThemeColors.white};
`;

const DropzoneSubText = styled.span`
  font-size: 14px;
  color: ${ThemeColors.gray};
`;

const ErrorText = styled.p`
  color: ${ThemeColors.red};
  font-size: 14px;
  margin-top: 8px;
`;

const SVGIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    color: ${ThemeColors.white};
  }
`;

export default Dropzone;

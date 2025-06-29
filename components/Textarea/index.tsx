import { forwardRef, TextareaHTMLAttributes } from "react";

import { Container, Label, Error, CleanTextArea } from "./styled";
import React from "react";
import { Box } from "@mui/material";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Style = Omit<
  NonNullable<TextareaProps["style"]>,
  "maxHeight" | "minHeight"
> & {
  height?: number;
};
export interface ITextAreaBase {
  style?: Style;
  error?: string;
  label: string;
  icon?: string;
  multiline?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  customStyle?: React.CSSProperties;
}

export interface ITextAreaAsInput
  extends ITextAreaBase,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof ITextAreaBase> {}

export type IFormInput = ITextAreaAsInput;

export const TextArea = forwardRef<HTMLTextAreaElement, IFormInput>(
  (
    {
      name,
      error,
      label,
      icon,
      value,
      disabled = false,
      defaultValue = null,
      customStyle,
      ...rest
    },
    ref
  ) => {
    return (
      <Box width="100%" style={customStyle}>
        <Container>
          <CleanTextArea
            id={name}
            name={name}
            value={value}
            disabled={disabled}
            ref={ref}
            {...rest}
          />
          <Label $hasValue={!!value} htmlFor={name}>
            {label}
          </Label>
          {error && <Error>{error}</Error>}
        </Container>
      </Box>
    );
  }
);

TextArea.displayName = "TextArea";

import { InputHTMLAttributes, forwardRef } from "react";

import { LabeledInput, Container, Error, Label } from "./styled";
import React from "react";
import { Box } from "@mui/material";

export interface IFormInputBase {
  error?: string;
  label: string;
  icon?: string;
  multiline?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  customStyle?: React.CSSProperties;
}

export interface IFormInputAsInput
  extends IFormInputBase,
    Omit<InputHTMLAttributes<HTMLInputElement>, keyof IFormInputBase> {
  multiline?: false;
  type?: string;
}

export type IFormInput = IFormInputAsInput;

export const FormInput = forwardRef<HTMLInputElement, IFormInput>(
  (
    {
      name,
      multiline = false,
      type = "text",
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
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <Container style={customStyle}>
          <Label $multiline={multiline} $hasValue={!!value} htmlFor={name}>
            {label}
          </Label>
          <LabeledInput
            id={name}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            ref={ref}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        </Container>
        {error && <Error>{error}</Error>}
      </Box>
    );
  }
);

FormInput.displayName = "FormInput";

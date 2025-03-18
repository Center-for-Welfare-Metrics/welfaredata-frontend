import {
  useState,
  FC,
  InputHTMLAttributes,
  useEffect,
  TextareaHTMLAttributes,
} from "react";

import { Container, Label, Icon, Error } from "./form-input-styled";
import { LabeledInput, LabeledTextArea } from "./inputs";
import React from "react";
import { Box } from "@material-ui/core";

export interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  error?: string;
  label: string;
  icon?: string;
  value: any;
  multiline?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  customStyle?: any;
  minRows?: number;
  maxRows?: number;
}

const FormInput:
  | FC<IFormInput>
  | FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
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
}) => {
  return (
    <Box py={3} width="100%">
      <Container style={customStyle}>
        <Label $multiline={multiline} $hasValue={!!value} htmlFor={name}>
          {label}
        </Label>
        {multiline ? (
          <LabeledTextArea
            id={name}
            name={name}
            value={value}
            disabled={disabled}
            {...rest}
          />
        ) : (
          <LabeledInput
            id={name}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            {...rest}
          />
        )}

        {error && <Error>{error}</Error>}
      </Container>
    </Box>
  );
};

export default React.memo(FormInput);

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

export interface IFormInputBase {
  name: string;
  error?: string;
  label: string;
  icon?: string;
  value: any;
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

export interface IFormInputAsTextarea
  extends IFormInputBase,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof IFormInputBase> {
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  type?: string;
}

export type IFormInput = IFormInputAsInput | IFormInputAsTextarea;

const FormInput: FC<IFormInput> = ({
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
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement> as any)}
          />
        ) : (
          <LabeledInput
            id={name}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <Error>{error}</Error>}
      </Container>
    </Box>
  );
};

export default React.memo(FormInput);

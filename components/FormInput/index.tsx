import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

import { LabeledInput, Container, Error, Label } from "./styled";
import React from "react";
import { Box, IconButton } from "@mui/material";
import { ThemeColors } from "theme/globalStyle";

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
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <Container style={{ ...customStyle, position: "relative" }}>
          <LabeledInput
            id={name}
            name={name}
            type={inputType}
            value={value}
            disabled={disabled}
            ref={ref}
            style={{ paddingRight: type === "password" ? "40px" : undefined }}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
          <Label $multiline={multiline} $hasValue={!!value} htmlFor={name}>
            {label}
          </Label>
          {type === "password" && (
            <IconButton
              onClick={togglePasswordVisibility}
              disabled={disabled}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "4px",
              }}
              size="small"
            >
              {showPassword ? (
                <EyeOff size={16} color={ThemeColors.white} />
              ) : (
                <Eye size={16} color={ThemeColors.white} />
              )}
            </IconButton>
          )}
        </Container>
        {error && <Error>{error}</Error>}
      </Box>
    );
  }
);

FormInput.displayName = "FormInput";

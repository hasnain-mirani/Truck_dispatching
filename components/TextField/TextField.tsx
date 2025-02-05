"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";

export interface CustomTextFieldProps extends Omit<MuiTextFieldProps, "error"> {
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  passwordField?: boolean;
}

export function TextField({
  errorMessage,
  startIcon,
  endIcon,
  loading = false,
  passwordField = false,
  ...props
}: CustomTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MuiTextField
      {...props}
      type={passwordField ? (showPassword ? "text" : "password") : props.type}
      variant="outlined"
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      fullWidth
      InputProps={{
        startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : null,
        endAdornment: (
          <InputAdornment position="end">
            {loading ? (
              <CircularProgress size={20} />
            ) : passwordField ? (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : (
              endIcon
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        "& label.Mui-focused": {
          color: "#fecf19",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#fecf19",
          },
          "&:hover fieldset": {
            borderColor: "#e6b800",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#fecf19",
          },
        },
      }}
    />
  );
}

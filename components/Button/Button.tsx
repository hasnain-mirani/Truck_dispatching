"use client";

import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import React from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "lg";

export interface ButtonProps extends Omit<MuiButtonProps, "size" | "variant"> {
  intent?: ButtonVariant;
  size?: ButtonSize;
  underline?: boolean;
  href?: string;
}

export function Button({
  intent = "primary",
  size = "lg",
  underline = false,
  href,
  children,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      {...props}
      href={href}
      component={href ? "a" : "button"}
      variant={intent === "primary" ? "contained" : "outlined"}
      color="primary"
      size={size === "sm" ? "small" : "large"}
      sx={{
        textDecoration: underline ? "underline" : "none",
        borderRadius: 2,
      }}
    >
      {children}
    </MuiButton>
  );
}

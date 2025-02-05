"use client"

import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material"
import React from "react"

export type ButtonVariant = "primary" | "secondary" | "danger"
export type ButtonSize = "sm" | "lg"

export interface ButtonProps extends Omit<MuiButtonProps, "size" | "variant"> {
  intent?: ButtonVariant
  size?: ButtonSize
  underline?: boolean
  href?: string
  loading?: boolean
  fullWidth?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export function Button({
  intent = "primary",
  size = "lg",
  underline = false,
  href,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const colorMap = {
    primary: "#fecf19",
    secondary: "#012a66",
    danger: "#d32f2f",
  }

  return (
    <MuiButton
      {...props}
      href={href}
      component={href ? "a" : "button"}
      variant="contained"
      color="primary"
      size={size === "sm" ? "small" : "large"}
      sx={{
        textDecoration: underline ? "underline" : "none",
        borderRadius: 2,
        backgroundColor: colorMap[intent],
        color: intent === "primary" ? "#000" : "#fff",
        "&:hover": {
          backgroundColor: intent === "primary" ? "#e6b800" : intent === "secondary" ? "#011f4a" : "#b71c1c",
        },
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
      disabled={loading || props.disabled}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
    >
      {children}
    </MuiButton>
  )
}

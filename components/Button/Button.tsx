"use client"

import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material"
import NextLink from "next/link"
import React from "react"

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "link"
export type ButtonSize = "sm" | "md" | "lg"

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

function isExternalLink(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/.test(href)
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
  let Component: React.ElementType = "button"
  if (href) {
    Component = isExternalLink(href) ? "a" : NextLink
  }

  const externalProps =
    href && isExternalLink(href)
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {}

  const styleMap = {
    primary: {
      variant: "contained",
      backgroundColor: "#fecf19",
      color: "#000",
      hoverBg: "#e6b800",
      hoverColor: undefined,
      border: "none",
    },
    secondary: {
      variant: "contained",
      backgroundColor: "#012a66",
      color: "#fff",
      hoverBg: "#011f4a",
      hoverColor: undefined,
      border: "none",
    },
    danger: {
      variant: "contained",
      backgroundColor: "#d32f2f",
      color: "#fff",
      hoverBg: "#b71c1c",
      hoverColor: undefined,
      border: "none",
    },
    outline: {
      variant: "outlined",
      backgroundColor: "transparent",
      color: "#012a66",
      hoverBg: "#012a66",
      hoverColor: "#fff",
      border: "#012a66",
    },
    link: {
      variant: "text",
      backgroundColor: "transparent",
      color: "#012a66",
      hoverBg: "transparent",
      padding: "unset",
      margin: "unset",
    },
  } as const

  const currentStyle = styleMap[intent]

  return (
    <MuiButton
      {...props}
      {...externalProps}
      component={Component}
      variant={currentStyle.variant as "contained" | "outlined" | "text"}
      {...(Component === NextLink ? { href } : {})}
      color="primary"
      size={size === "sm" ? "small" : size === "md" ? "medium" : "large"}
      disabled={loading || props.disabled}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
      sx={{
        textDecoration: underline ? "underline" : "none",
        borderRadius: 1,
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        border: "variant" in currentStyle && currentStyle.variant === "outlined" ? `1px solid ${currentStyle.color}` : "none",
        width: fullWidth ? "100%" : "auto", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        "&:hover": {
          backgroundColor: currentStyle.variant === "text" ? "transparent" : currentStyle.hoverBg,
          color: "hoverColor" in currentStyle ? currentStyle.hoverColor : currentStyle.color,
        },
        "&:disabled": {
          opacity: 0.7,
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiButton>
  )
}

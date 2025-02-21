"use client"

import { Avatar, Chip, ChipProps, SxProps, Theme } from "@mui/material"
import React from "react"

export interface TagChipProps extends Omit<ChipProps, "avatar" | "label"> {
  count?: number | string
  label: React.ReactNode
  avatarBgColor?: string
  avatarTextColor?: string
  avatarSx?: SxProps<Theme>
}

export function TagChip({
  count,
  label,
  avatarBgColor = "#d1d1d1",
  avatarTextColor = "#6b6b6b",
  avatarSx,
  sx,
  ...props
}: TagChipProps) {
  const avatar =
    count !== undefined ? (
      <Avatar
        sx={{
          bgcolor: avatarBgColor,
          color: avatarTextColor,
          width: 28,
          height: 28,
          fontSize: "0.8rem",
          ...avatarSx,
        }}
      >
        {count}
      </Avatar>
    ) : undefined

  return (
    <Chip
      avatar={avatar}
      label={label}
      sx={{
        borderRadius: 4,
        ...sx,
      }}
      {...props}
    />
  )
}

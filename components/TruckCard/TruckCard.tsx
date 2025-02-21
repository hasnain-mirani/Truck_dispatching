"use client"

import { DirectionsCar, Warning, Wifi } from "@mui/icons-material"
import { Box, Card, CardActionArea, CardContent, CardMedia, SxProps, Theme, Typography } from "@mui/material"
import React from "react"

export type TruckStatus = "on-route" | "idle" | "out-of-service"

export interface TruckCardProps {
  identifier: string
  type: string
  imageUrl: string
  capacity?: string
  wheels?: string
  status: TruckStatus
  cardWidth?: number
  onClick?: () => void
  sx?: SxProps<Theme>
}

export function TruckCard({
  identifier,
  type,
  imageUrl,
  capacity,
  wheels,
  status,
  cardWidth,
  onClick,
  sx,
}: TruckCardProps) {
  const statusInfo: Record<TruckStatus, { label: string; color: string; icon: React.ReactNode }> = {
    "on-route": {
      label: "On Route",
      color: "#0288d1",
      icon: <DirectionsCar fontSize="small" />,
    },
    idle: {
      label: "Idle",
      color: "#f57c00",
      icon: <Wifi fontSize="small" />,
    },
    "out-of-service": {
      label: "Out of Service",
      color: "#d32f2f",
      icon: <Warning fontSize="small" />,
    },
  }

  const { label: statusLabel, color: statusColor, icon: statusIcon } = statusInfo[status]

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        width: cardWidth,
        boxShadow: 2,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: onClick ? "scale(1.02)" : "none",
        },
        ...sx,
      }}
    >
      <CardActionArea onClick={onClick} sx={{ display: "block", width: "100%", height: "100%" }}>
        <CardMedia component="img" src={imageUrl} alt={identifier} sx={{ height: 160, objectFit: "cover" }} />

        <CardContent sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body1" fontWeight="bold">
              {identifier}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              {statusIcon}
              <Typography variant="caption" fontWeight="bold" color={statusColor}>
                {statusLabel}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {type}
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={1}>
            {capacity && (
              <Typography variant="body2" color="text.secondary">
                {capacity}
              </Typography>
            )}
            {wheels && (
              <Typography variant="body2" color="text.secondary">
                {wheels}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

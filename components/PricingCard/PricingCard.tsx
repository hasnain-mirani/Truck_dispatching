"use client"

import { Box, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { Button } from "components/Button/Button"

interface PricingCardProps {
  title: string
  description: string
  totalPrice?: number
  priceDescription?: string
  trialText?: string
  trialLink?: string
  onDemoClick: () => void
}

export function PricingCard({
  title,
  description,
  totalPrice = 0,
  priceDescription = "",
  trialText,
  trialLink,
  onDemoClick,
}: PricingCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        border: "2px solid #FBAB20",
        borderRadius: 2,
        p: 3,
        textAlign: "center",
        maxWidth: 370,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="#FBAB20">
        {title}
      </Typography>

      <Typography variant="body2" mt={1} mb={2} textAlign="left">
        {description}
      </Typography>

      <Box
        mt={2}
        mb={2}
        sx={{
          minHeight: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        {totalPrice !== 0 && (
          <Typography variant="h4" fontWeight="bold" color="#FBAB20">
            {`$${totalPrice}`}
          </Typography>
        )}
        {priceDescription && (
          <Typography variant="body2" textAlign="left">
            {priceDescription}
          </Typography>
        )}
      </Box>

      <Button intent="primary" size="md" fullWidth onClick={onDemoClick}>
        Get a Demo
      </Button>

      {trialText && (
        <Typography variant="body2" mt={2}>
          <Link
            href={trialLink ?? ""}
            style={{
              textDecoration: "none",
              color: "#2196F3",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            {trialText}
          </Link>
        </Typography>
      )}
    </Paper>
  )
}

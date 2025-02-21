"use client";

import { Box, Card, CardActionArea, CardMedia, CardProps, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export interface ClickableCardProps extends Omit<CardProps, "onClick"> {
  /** Image URL for the card (e.g., brand logo) */
  image: string;
  /** Title or label to display in the bottom overlay (e.g., "12 Trucks") */
  title: string;
  /** 
   * URL for navigation. 
   * If provided, the card uses <Link> to navigate on click.
   * If omitted, the card is non-clickable (unless onClick is used).
   */
  href?: string;
  /**
   * Optional onClick callback if you prefer a custom click handler.
   * If both href and onClick are provided, href takes precedence.
   */
  onClick?: () => void;
}

/**
 * A reusable, dynamic, and production-ready clickable card
 * that displays an image with a bottom overlay title.
 */
export function ClickableCard({
  image,
  title,
  href,
  onClick,
  sx,
  ...props
}: ClickableCardProps) {
  // Card content (image + overlay)
  const cardContent = (
    <>
      <CardMedia
        component="img"
        src={image}
        alt={title}
        sx={{
          height: 140,
          objectFit: "contain",
          bgcolor: "#f5f5f5",
        }}
      />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "#fff",
          textAlign: "center",
          py: 1,
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
      </Box>
    </>
  );

  // Decide how the card should render based on href or onClick
  let actionAreaContent = (
    <CardActionArea>{cardContent}</CardActionArea>
  );

  if (href) {
    // If an href is provided, wrap the content in Next.js <Link>
    actionAreaContent = (
      <Link href={href} style={{ textDecoration: "none" }}>
        <CardActionArea component="div">{cardContent}</CardActionArea>
      </Link>
    );
  } else if (onClick) {
    // If onClick is provided but no href, CardActionArea calls onClick directly
    actionAreaContent = (
      <CardActionArea onClick={onClick}>{cardContent}</CardActionArea>
    );
  }

  return (
    <Card
      sx={{
        width: 200, // Adjust to your preferred width
        borderRadius: 2,
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {actionAreaContent}
    </Card>
  );
}

"use client";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) =>
        item.href ? (
          <Link key={index} color="inherit" href={item.href} underline="hover">
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}

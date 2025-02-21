"use client"

import { Add, ChevronLeft, Menu } from "@mui/icons-material"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { usePathname } from "next/navigation"
import React from "react"
import { Button, ButtonProps } from "components/Button/Button"

const drawerWidth = 240

export interface TopBarActionButtonProps extends Omit<ButtonProps, "children"> {
  label: React.ReactNode
}

export interface TopBarProps {
  handleDrawerToggle: () => void
  pageTitle?: string
  actionButton?: TopBarActionButtonProps
  buttonPosition?: "left" | "right"
}

export function TopBar({ handleDrawerToggle, pageTitle, actionButton, buttonPosition = "right" }: TopBarProps) {
  const pathname = usePathname()

  const defaultTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/partners": "Partners",
    "/dashboard/partners/new-partner": "Add new partner",
    "/dashboard/chat": "Chat",
    "/dashboard/trucks": "Trucks",
    "/dashboard/trucks/trucks2": "Trucks",
    "/dashboard/trucks/new-truck": "Add new truck",
    "/dashboard/drivers": "Drivers",
    "/dashboard/drivers/new-driver": "Add new driver",
    "/dashboard/requests": "Requests",
    "/dashboard/reports": "Reports",
  }

  const defaultActionButtons: Record<string, TopBarActionButtonProps | undefined> = {
    "/dashboard/partners": {
      label: "Add Partner",
      href: "/dashboard/partners/new-partner",
      intent: "secondary",
      size: "md",
      startIcon: <Add />,
    },
    "/dashboard/partners/new-partner": {
      label: "Partners",
      startIcon: <ChevronLeft />,
      href: "/dashboard/partners",
      intent: "outline",
      size: "md",
    },
    "/dashboard/trucks": {
      label: "Add Truck",
      href: "/dashboard/trucks/new-truck",
      intent: "secondary",
      size: "md",
      startIcon: <Add />,
    },
    "/dashboard/trucks/trucks2": {
      label: "Add Truck",
      href: "/dashboard/trucks/new-truck",
      intent: "secondary",
      size: "md",
      startIcon: <Add />,
    },
    "/dashboard/trucks/new-truck": {
      label: "Get Back",
      startIcon: <ChevronLeft />,
      href: "/dashboard/trucks",
      intent: "outline",
      size: "md",
    },
    "/dashboard/drivers": {
      label: "Add Truck",
      href: "/dashboard/drivers/new-driver",
      intent: "secondary",
      size: "md",
      startIcon: <Add />,
    },
    "/dashboard/drivers/new-driver": {
      label: "Get Back",
      startIcon: <ChevronLeft />,
      href: "/dashboard/drivers",
      intent: "outline",
      size: "md",
    },
  }

  const title = pageTitle || defaultTitles[pathname] || "Dashboard"
  const btn = actionButton || defaultActionButtons[pathname]

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "15px", flexGrow: 1 }}>
          {buttonPosition === "left" && btn && (
            <Button {...btn} sx={{ mr: 2, ...btn.sx }}>
              {btn.label}
            </Button>
          )}

          <Typography variant="h6" noWrap>
            {title}
          </Typography>

          {buttonPosition === "right" && btn && (
            <Button {...btn} sx={{ ml: 2, ...btn.sx }}>
              {btn.label}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

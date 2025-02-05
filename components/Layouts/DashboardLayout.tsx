"use client"

import { Box, CssBaseline, Toolbar } from "@mui/material"
import { useState } from "react"
import { Breadcrumb } from "components/Dashboard/Breadcrumb"
import { Sidebar } from "components/Dashboard/Sidebar"
import { TopBar } from "components/Dashboard/Topbar"

interface DashboardLayoutProps {
  children: React.ReactNode
  breadcrumbItems?: { label: string; href?: string }[]
}

export function DashboardLayout({ children, breadcrumbItems = [] }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, backgroundColor: "#f4f5f7", minHeight: "100vh" }}
      >
        <Toolbar />
        <Breadcrumb items={breadcrumbItems} />
        {children}
      </Box>
    </Box>
  )
}

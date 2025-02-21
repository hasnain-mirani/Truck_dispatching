"use client"

import { Assignment, BarChart, Chat, Dashboard, LocalShipping, People } from "@mui/icons-material"
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

const drawerWidth = 240

interface SidebarProps {
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Partners", icon: <People />, path: "/dashboard/partners" },
  { text: "Chat", icon: <Chat />, path: "/chat" },
  { text: "Trucks", icon: <LocalShipping />, path: "/dashboard/trucks" },
  { text: "Requests", icon: <Assignment />, path: "/dashboard/requests" },
  { text: "Reports", icon: <BarChart />, path: "/dashboard/reports" },
]

export function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  const pathname = usePathname()

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          TRUCKVISE
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.path

            return (
              <ListItem key={item.text} disablePadding>
                <Link href={item.path} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                  <ListItemButton selected={isActive}>
                    <ListItemIcon sx={{ color: "#012a66" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src="/assets/dashboard/profile/man-profile.png"
            alt="Profile"
            sx={{ width: 40, height: 40, borderRadius: "50%", mr: 2 }}
          />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Khalid Al wadood
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fleet Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawerContent}
      </Drawer>

      <Drawer variant="permanent" open sx={{ display: { xs: "none", sm: "block" } }}>
        {drawerContent}
      </Drawer>
    </Box>
  )
}

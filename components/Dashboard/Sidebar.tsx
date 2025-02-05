"use client";

import { Assignment, BarChart, Chat, Dashboard, LocalShipping, People } from "@mui/icons-material";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const menuItems = [
  { text: "Dashboard", icon: <Dashboard /> },
  { text: "Partners", icon: <People /> },
  { text: "Chat", icon: <Chat /> },
  { text: "Trucks", icon: <LocalShipping /> },
  { text: "Requests", icon: <Assignment /> },
  { text: "Reports", icon: <BarChart /> },
];

export function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: "100%", backgroundColor: "#fff", color: "#000" }}>
      <Toolbar sx={{ justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
        Fleet Manager
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#012a66" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile Sidebar */}
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", sm: "none" } }}>
        {drawerContent}
      </Drawer>
      {/* Desktop Sidebar */}
      <Drawer variant="permanent" open sx={{ display: { xs: "none", sm: "block" } }}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}

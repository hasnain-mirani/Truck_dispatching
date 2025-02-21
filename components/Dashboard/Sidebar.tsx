"use client";

import {
  Assignment,
  BarChart,
  Chat,
  Dashboard,
  LocalShipping,
  People,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

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
      {/* 1. Logo/Brand Section */}
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

      {/* 2. Menu Section */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
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

      {/* 3. Profile Card Section */}
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Replace this with the actual user profile image URL */}
          <Box
            component="img"
            src="/images/profile.jpg"
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
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile Sidebar */}
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
  );
}

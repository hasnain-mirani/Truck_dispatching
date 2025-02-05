"use client";

import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

interface TopBarProps {
  handleDrawerToggle: () => void;
  pageTitle?: string;
}

export function TopBar({ handleDrawerToggle, pageTitle }: TopBarProps) {
  const pathname = usePathname();

  const defaultTitles: { [key: string]: string } = {
    "/": "Dashboard",
    "/partners": "Partners",
    "/chat": "Chat",
    "/trucks": "Trucks",
    "/requests": "Requests",
    "/reports": "Reports",
  };

  const title = pageTitle || defaultTitles[pathname] || "Dashboard";

  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: "white", boxShadow: "none", borderBottom: "1px solid #e0e0e0" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";

const drawerWidth = 260;

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/" },
    { text: "Products", icon: <Inventory2Icon />, path: "/product" },
    { text: "Purchases", icon: <ShoppingCartIcon />, path: "/purchase" },
    { text: "Sales", icon: <ReceiptIcon />, path: "/sale" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  const handleNavigate = (item) => {
    if (item.text === "Logout") {
      logout();
    } else {
      navigate(item.path);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
            borderRight: "1px solid rgba(226, 232, 240, 0.1)",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            py: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              AB
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "white",
                letterSpacing: "0.5px",
              }}
            >
              AccBuddy
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#cbd5e1",
              fontSize: "0.75rem",
              textAlign: "center",
            }}
          >
            Accounting Platform
          </Typography>
        </Toolbar>

        <Divider sx={{ borderColor: "rgba(226, 232, 240, 0.1)", my: 2 }} />

        <List sx={{ px: 1.5, flexGrow: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigate(item)}
                sx={{
                  borderRadius: "10px",
                  mb: 1,
                  color: isActive ? "white" : "#cbd5e1",
                  background: isActive
                    ? "linear-gradient(90deg, #7c3aed30 0%, #6d28d930 100%)"
                    : "transparent",
                  border: isActive ? "1px solid #7c3aed50" : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(90deg, #7c3aed40 0%, #6d28d940 100%)"
                      : "rgba(226, 232, 240, 0.1)",
                    color: "white",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: isActive ? 700 : 500,
                    },
                  }}
                />
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(226, 232, 240, 0.1)", my: 2 }} />

        <Box
          sx={{
            p: 2,
            textAlign: "center",
            borderTop: "1px solid rgba(226, 232, 240, 0.1)",
          }}
        >
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            © 2026 AccBuddy
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

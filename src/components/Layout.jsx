import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
            boxShadow: "0 4px 16px rgba(12, 18, 44, 0.1)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Accounting Platform
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

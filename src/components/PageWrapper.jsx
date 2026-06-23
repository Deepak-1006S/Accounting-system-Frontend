import { Typography, Box } from "@mui/material";
import React from "react";

const PageWrapper = ({ children, heading = "" }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            marginBottom: "8px",
            background: "linear-gradient(90deg, #0f172a 0%, #7c3aed 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {heading}
        </Typography>
        <Box
          sx={{
            height: "4px",
            width: "60px",
            background: "linear-gradient(90deg, #7c3aed 0%, #6d28d9 100%)",
            borderRadius: "2px",
          }}
        />
      </Box>
      <Box className="page-wrapper">{children}</Box>
    </Box>
  );
};

export default PageWrapper;

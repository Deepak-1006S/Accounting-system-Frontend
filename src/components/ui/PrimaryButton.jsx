import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({
  children,
  sx = {},
  type = "button",
  variant = "contained",
  ...restProps
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      sx={{
        mt: 3,
        mb: 2,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "1rem",
        py: 1.2,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        ...(variant === "contained" && {
          background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)",
          boxShadow: "0 8px 16px rgba(125, 58, 237, 0.3)",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(125, 58, 237, 0.4)",
            transform: "translateY(-2px)",
          },
        }),
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f172a",
      light: "#1e293b",
      dark: "#0a0f1f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7c3aed",
      light: "#a78bfa",
      dark: "#6d28d9",
    },
    success: {
      main: "#10b981",
    },
    error: {
      main: "#ef4444",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
    h1: { fontWeight: 800, fontSize: "2.5rem" },
    h2: { fontWeight: 700, fontSize: "2rem" },
    h3: { fontWeight: 700, fontSize: "1.5rem" },
    h5: { fontWeight: 700 },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "12px 24px",
          boxShadow: "0 4px 12px rgba(124, 58, 237, 0.15)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(124, 58, 237, 0.25)",
            transform: "translateY(-2px)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(12, 18, 44, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(12, 18, 44, 0.08)",
          transition: "all 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(12, 18, 44, 0.12)",
          },
        },
      },
    },
  },
});

export default theme;

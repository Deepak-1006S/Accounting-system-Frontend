import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <span color="inherit">Accounting platform </span>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      setSubmitError(errorMessage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper className="premium-paper" elevation={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
          {submitError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 1, whiteSpace: "pre-wrap" }}
            >
              {submitError}
            </Typography>
          )}
          <TextField
            type="text"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={formData.username || ""}
            onChange={handleOnChange}
          />
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email || ""}
            onChange={handleOnChange}
            InputProps={{
              sx: {
                minWidth: 0,
                overflow: "auto",
                fontSize: "0.95rem",
              },
            }}
            inputProps={{
              style: {
                minWidth: 0,
                overflow: "auto",
                whiteSpace: "nowrap",
              },
            }}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            value={formData.password || ""}
            onChange={handleOnChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
            }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
          </Box>
        </Paper>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

import React from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import Product from "./pages/Product";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/sale" element={<Sale />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

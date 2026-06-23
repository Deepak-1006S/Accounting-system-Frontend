import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useProductContext } from "../context/ProductContext";

const Product = () => {
  const { addProduct, fetchProducts, products } = useProductContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost_price: "",
    sell_price: "",
  });

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addProduct(formData);
    setFormData({
      name: "",
      description: "",
      cost_price: "",
      sell_price: "",
    });
  };

  return (
    <PageWrapper heading="Product Management">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Add New Product
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                type="text"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleOnChange}
              />
              <TextField
                type="text"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleOnChange}
              />
              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                name="cost_price"
                label="Cost Price"
                id="cost_price"
                value={formData.cost_price}
                onChange={handleOnChange}
              />
              <TextField
                type="number"
                margin="normal"
                required
                fullWidth
                name="sell_price"
                label="Sell Price"
                id="sell_price"
                value={formData.sell_price}
                onChange={handleOnChange}
              />

              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                }}
              >
                Add Product
              </PrimaryButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Product Summary
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  background: "linear-gradient(135deg, #7c3aed20 0%, #7c3aed10 100%)",
                  border: "1px solid #7c3aed40",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontWeight: 600 }}
                >
                  Total Products
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                  {products.length}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  background: "linear-gradient(135deg, #3b82f620 0%, #3b82f610 100%)",
                  border: "1px solid #3b82f640",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontWeight: 600 }}
                >
                  Avg. Margin
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                  {products.length > 0
                    ? (
                        products.reduce(
                          (acc, p) =>
                            acc +
                            ((p.sell_price - p.cost_price) / p.cost_price) * 100,
                          0
                        ) / products.length
                      ).toFixed(2)
                    : 0}
                  %
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          All Products
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #cbd5e1",
                  textAlign: "left",
                  background: "linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%)",
                }}
              >
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Product Name
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Description
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Cost Price
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Sell Price
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Margin %
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const margin =
                  ((product.sell_price - product.cost_price) /
                    product.cost_price) *
                  100;
                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={{ padding: "14px 12px" }}>{product.name}</td>
                    <td style={{ padding: "14px 12px" }}>
                      {product.description.substring(0, 30)}...
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      ₹{product.cost_price}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      ₹{product.sell_price}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          background: margin > 20 ? "#d1fae5" : "#fef3c7",
                          color: margin > 20 ? "#10b981" : "#d97706",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                        }}
                      >
                        {margin.toFixed(2)}%
                      </Box>
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      {product?.stock?.quantity ?? 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Paper>
    </PageWrapper>
  );
};

export default Product;

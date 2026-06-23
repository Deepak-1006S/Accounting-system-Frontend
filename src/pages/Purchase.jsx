import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useProductContext } from "../context/ProductContext";
import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useTransaction } from "../context/TransactionContext";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Purchase = () => {
  const { createOrder, fetchOrders, purchaseOrders } = useTransaction();
  const { products, fetchProducts } = useProductContext();
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    cost_price: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders("buy");
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductSelect = (e) => {
    const selectedProduct = products.filter(
      (item) => item._id == e.target.value
    );
    setFormData((prev) => ({
      ...prev,
      product: e.target.value,
      cost_price: selectedProduct[0].cost_price,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createOrder({ ...formData, type: "buy" });
    setFormData({ product: "", quantity: "", cost_price: "" });
  };

  const calculateTotalSpent = (purchaseOrders) => {
    return purchaseOrders.reduce((acc, ele) => {
      const spent = ele.cost_price * ele.quantity;
      return acc + spent;
    }, 0);
  };

  return (
    <PageWrapper heading="Purchase Management">
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              New Purchase Order
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                select
                fullWidth
                margin="normal"
                id="product"
                name="product"
                label="Select Product"
                value={formData.product}
                onChange={handleProductSelect}
                required
              >
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name} - ₹{product.cost_price}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                fullWidth
                margin="normal"
                id="quantity"
                name="quantity"
                label="Quantity"
                value={formData.quantity}
                onChange={handleOnChange}
                required
              />
              <TextField
                type="number"
                fullWidth
                margin="normal"
                id="cost_price"
                name="cost_price"
                label="Unit Cost Price"
                value={formData.cost_price}
                onChange={handleOnChange}
                disabled
              />
              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                }}
              >
                Create Order
              </PrimaryButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #fee2e220 0%, #fee2e210 100%)",
              border: "1px solid #fee2e240",
              height: "100%",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: "12px",
                    background: "#ef4444",
                    color: "white",
                  }}
                >
                  <LocalShippingIcon sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    Total Purchase Spent
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#ef4444",
                      mt: 0.5,
                    }}
                  >
                    ₹{calculateTotalSpent(purchaseOrders).toFixed(2)}
                  </Typography>
                  <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                    Total Orders: {purchaseOrders.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Purchase History
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
                  Unit Cost
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Quantity
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Total Amount
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((purchaseOrder, index) => (
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
                  <td style={{ padding: "14px 12px" }}>
                    {purchaseOrder.product.name}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    ₹{purchaseOrder.cost_price}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {purchaseOrder.quantity}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    <span className="money-deducted">
                      -₹{purchaseOrder.quantity * purchaseOrder.cost_price}
                    </span>
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {new Date(purchaseOrder.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </PageWrapper>
  );
};

export default Purchase;

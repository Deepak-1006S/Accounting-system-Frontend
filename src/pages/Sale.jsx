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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Sale = () => {
  const { createOrder, fetchOrders, saleOrders } = useTransaction();
  const { products, fetchProducts } = useProductContext();
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    cost_price: "",
    sell_price: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders("sell");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProductSelect = (e) => {
    const selectedProduct = products.filter(
      (item) => item._id === e.target.value
    );
    setFormData((prev) => ({
      ...prev,
      product: e.target.value,
      cost_price: selectedProduct[0].cost_price,
      sell_price: selectedProduct[0].sell_price,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createOrder({ ...formData, type: "sell" });
    setFormData({ product: "", quantity: "", cost_price: "", sell_price: "" });
  };

  const calculateTotalProfit = (saleOrders) => {
    return saleOrders.reduce((acc, ele) => {
      const profit = (ele.sell_price - ele.cost_price) * ele.quantity;
      return acc + profit;
    }, 0);
  };

  const calculateTotalRevenue = (saleOrders) => {
    return saleOrders.reduce((acc, ele) => {
      return acc + ele.sell_price * ele.quantity;
    }, 0);
  };

  return (
    <PageWrapper heading="Sales Management">
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              New Sale Order
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
                    {product.name} - ₹{product.sell_price}
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
                label="Cost Price"
                value={formData.cost_price}
                onChange={handleOnChange}
                disabled
              />
              <TextField
                type="number"
                fullWidth
                margin="normal"
                id="sell_price"
                name="sell_price"
                label="Selling Price"
                value={formData.sell_price}
                onChange={handleOnChange}
                required
              />
              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                }}
              >
                Create Sale Order
              </PrimaryButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #d1fae520 0%, #d1fae510 100%)",
                  border: "1px solid #d1fae540",
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
                        background: "#10b981",
                        color: "white",
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Total Profit Earned
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#10b981",
                          mt: 0.5,
                        }}
                      >
                        ₹{calculateTotalProfit(saleOrders).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #bfdbfe20 0%, #bfdbfe10 100%)",
                  border: "1px solid #bfdbfe40",
                }}
              >
                <CardContent>
                  <Typography color="textSecondary" variant="body2">
                    Total Revenue
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#3b82f6",
                      mt: 0.5,
                    }}
                  >
                    ₹{calculateTotalRevenue(saleOrders).toFixed(2)}
                  </Typography>
                  <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                    Total Sales: {saleOrders.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Sales History
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
                  Cost Price
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Sell Price
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Quantity
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Revenue
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Profit
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {saleOrders.map((saleOrder, index) => {
                const profit =
                  (saleOrder.sell_price - saleOrder.cost_price) *
                  saleOrder.quantity;
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
                    <td style={{ padding: "14px 12px" }}>
                      {saleOrder.product.name}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      ₹{saleOrder.cost_price}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      ₹{saleOrder.sell_price}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      {saleOrder.quantity}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      ₹{saleOrder.quantity * saleOrder.sell_price}
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      <span className="money-received">
                        +₹{profit.toFixed(2)}
                      </span>
                    </td>
                    <td style={{ padding: "14px 12px" }}>
                      {new Date(saleOrder.createdAt).toLocaleDateString()}
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

export default Sale;

import React, { useEffect } from "react";
import { useTransaction } from "../context/TransactionContext";
import PageWrapper from "../components/PageWrapper";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card
    sx={{
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}40`,
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
            width: 50,
            height: 50,
            borderRadius: "12px",
            background: color,
            color: "white",
          }}
        >
          <Icon />
        </Box>
        <Box>
          <Typography color="textSecondary" variant="body2">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Home = () => {
  const { fetchOrders, transactions } = useTransaction();
  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateBalance = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "sell") {
        acc += transaction.sell_price * transaction.quantity;
      } else if (transaction.type === "buy") {
        acc -= transaction.cost_price * transaction.quantity;
      }
      return acc;
    }, 0);
  };

  const totalSales = transactions
    .filter((t) => t.type === "sell")
    .reduce((acc, t) => acc + t.sell_price * t.quantity, 0);

  const totalPurchases = transactions
    .filter((t) => t.type === "buy")
    .reduce((acc, t) => acc + t.cost_price * t.quantity, 0);

  const balance = calculateBalance(transactions);

  return (
    <PageWrapper heading="Dashboard">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Balance"
            value={`₹${balance.toFixed(2)}`}
            icon={balance > 0 ? TrendingUpIcon : TrendingDownIcon}
            color={balance > 0 ? "#10b981" : "#ef4444"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={`₹${totalSales.toFixed(2)}`}
            icon={TrendingUpIcon}
            color="#3b82f6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Purchases"
            value={`₹${totalPurchases.toFixed(2)}`}
            icon={LocalShippingIcon}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Transactions"
            value={transactions.length}
            icon={ShoppingCartIcon}
            color="#7c3aed"
          />
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Transaction History
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid #cbd5e1",
                  textAlign: "left",
                  background:
                    "linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 100%)",
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
                  Total Amount
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Date
                </th>
                <th style={{ padding: "16px 12px", fontWeight: 700 }}>
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
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
                    {transaction.product.name}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    ₹{transaction.cost_price}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    ₹{transaction.sell_price}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {transaction.quantity}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {transaction.type === "sell" ? (
                      <span className="money-received">
                        +₹{transaction.quantity * transaction.sell_price}
                      </span>
                    ) : (
                      <span className="money-deducted">
                        -₹{transaction.quantity * transaction.cost_price}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "14px 12px" }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        background:
                          transaction.type === "sell"
                            ? "#d1fae5"
                            : "#fee2e2",
                        color:
                          transaction.type === "sell"
                            ? "#10b981"
                            : "#ef4444",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                      }}
                    >
                      {transaction.type === "sell" ? "Sale" : "Purchase"}
                    </Box>
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

export default Home;

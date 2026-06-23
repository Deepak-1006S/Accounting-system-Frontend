import React, { createContext, useState, useContext, useEffect } from "react";
import { authAxiosInstance } from "../utils/axiosConfig";
import queryString from "query-string";

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [purchaseOrders, setPurchasesOrders] = useState([]);
  const [saleOrders, setSaleOrders] = useState([]);
  const [transactions, setTransaction] = useState([]);
  const fetchOrders = async (type) => {
    try {
      const string = queryString.stringify({ type });
      const resp = await authAxiosInstance.get(`/transactions?${string}`);
      if (type == "buy") {
        setPurchasesOrders(resp.data.data);
      } else if (type == "sell") {
        setSaleOrders(resp.data.data);
      } else {
        setTransaction(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (data) => {
    try {
      const resp = await authAxiosInstance.post("/transactions", {
        ...data,
      });
      fetchOrders(data.type);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        createOrder,
        fetchOrders,
        purchaseOrders,
        saleOrders,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

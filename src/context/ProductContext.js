import React, { createContext, useState, useContext } from "react";
import { authAxiosInstance } from "../utils/axiosConfig";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

// ProductContext Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await authAxiosInstance.get("/products/get");
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Function to add a new product
  const addProduct = async (formData) => {
    setLoading(true);
    try {
      const response = await authAxiosInstance.post("products/add", formData);
      // setProducts([...products, response.data]);
      fetchProducts();

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Value object to be provided by the context
  const value = {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

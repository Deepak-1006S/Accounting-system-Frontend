import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: apiBaseURL,
});
export const authAxiosInstance = axios.create({
  baseURL: apiBaseURL,
});

// Add interceptor
authAxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor || Middleware for 401
authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

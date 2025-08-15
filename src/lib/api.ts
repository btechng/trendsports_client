// src/lib/api.ts
import axios from "axios";

// Base URL of your backend
const BASE_URL = "https://trendsports-server.onrender.com/api";

export const API = axios.create({
  baseURL: BASE_URL, // ✅ ensures all requests are under /api
  withCredentials: true, // ✅ include cookies for auth if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a response interceptor for global error logging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

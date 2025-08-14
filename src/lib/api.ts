import axios from "axios";
export const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE || "https://trendsports-server.onrender.com",
});

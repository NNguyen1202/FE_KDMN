import axios from "axios";

const api = axios.create({
  baseURL: "https://kdmn-easyhrm-icare.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://kdmn-easyhrm-icare.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (
      status === 401 ||
      message === "jwt expired" ||
      message === "invalid token" ||
      message === "Unauthorized"
    ) {
      // Xóa dữ liệu đăng nhập
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("user");

      // Tránh redirect lặp
      if (window.location.pathname !== "/signin") {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        window.location.replace("/signin");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
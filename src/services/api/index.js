import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const publicEndpoints = ["/login"];
    const isPublicEndpoint = publicEndpoints.some((url) => config.url.includes(url));
    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const userStore = useAuthStore();
    if (error.response?.status === 401 && error.config?.url != "auth/refresh" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await userStore.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

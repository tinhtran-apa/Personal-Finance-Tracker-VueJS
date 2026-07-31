import { defineStore } from "pinia";
import { getMe, login, refreshToken } from "../services/api/auth.service";
import { toast } from "vue3-toastify";
import { ROUTES } from "@/constants/routes";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const savedUser = localStorage.getItem("user") || null;
    return {
      users: savedUser ? JSON.parse(savedUser) : null,
      accessToken: localStorage.getItem("accessToken") || null,
      loading: false,
    };
  },
  actions: {
    async loginUser(payload) {
      try {
        this.loading = true;
        const accessToken = await login(payload);
        this.accessToken = accessToken.data.accessToken;
        localStorage.setItem("accessToken", this.accessToken);
        const user = await getMe();
        this.user = user.data;
        localStorage.setItem("users", JSON.stringify(this.user));
        toast.success(accessToken.message);
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async refreshToken() {
      try {
        const newAccessToken = await refreshToken();
        this.accessToken = newAccessToken.data.accessToken;
        localStorage.setItem("accessToken", this.accessToken);
        return newAccessToken.data.accessToken;
      } catch (error) {
        this.clearAuthData();
        window.location.href = ROUTES.LOGIN
        throw error;
      }
    },
    clearAuthData() {
      this.users = null;
      this.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("users");
    },
  },
});

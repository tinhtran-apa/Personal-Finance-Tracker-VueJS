import { defineStore } from "pinia";
import { getCurrentUser, login, logout, refreshToken } from "../services/api/auth.service";
import { PATH } from "@/shared/constants/path.constant.js";

export const useAuthStore = defineStore("auth", {
  state: () => {
    const savedUser = localStorage.getItem("users") || null;
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
        const user = await getCurrentUser();
        this.users = user.data;
        localStorage.setItem("users", JSON.stringify(this.users));
        return accessToken.message;
      } catch (error) {
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
        window.location.href = PATH.LOGIN.href;
        throw error;
      }
    },
    async logOutUser() {
      try {
        const response = await logout();
        this.clearAuthData();
        return response.message;
      } catch (error) {
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

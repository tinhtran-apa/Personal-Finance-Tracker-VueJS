import api from "@/services/api";
import { PATH } from "@/shared/constants/path.constant.js";

export const register = async (user) => {
    const response = await api.post(PATH.AUTH.api.register, user)
    return response.data;
}

export const login = async (user) => {
    const response = await api.post(PATH.AUTH.api.login, user);
    return response.data;
}

export const getCurrentUser = async() => {
    const response = await api.get(PATH.AUTH.api.currentUser);
    return response.data;
}

export const logout = async () => {
    const response = await api.post(PATH.AUTH.api.logout);
    return response.data
}

export const refreshToken = async() => {
    const response = await api.post(PATH.AUTH.api.refresh)
    return response.data;
}

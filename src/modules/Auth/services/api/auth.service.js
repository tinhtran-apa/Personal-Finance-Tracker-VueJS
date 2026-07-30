import api from "@/services/api";

export const register = async (user) => {
    const response = await api.post("auth/register", user)
    return response.data;
}

export const login = async (user) => {
    const response = await api.post("auth/login", user);
    return response.data;
}

export const getMe = async() => {
    const response = await api.get("auth/me");
    return response.data;
}

export const refreshToken = async() => {
    const response = await api.post("auth/refresh")
    return response.data;
}
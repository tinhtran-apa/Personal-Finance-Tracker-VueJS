import api from "@/services/api";

export const register = async (user) => {
    const response = await api.post("auth/register", user)
    return response.data;
}

export const login = async (user) => {
    const response = await api.post("auth/login", user);
    return response.data;
}

export const getCurrentUser = async() => {
    const response = await api.get("auth/current-user");
    return response.data;
}

export const logout = async () => {
    const response = await api.post("auth/logout");
    return response.data
}

export const refreshToken = async() => {
    const response = await api.post("auth/refresh")
    return response.data;
}
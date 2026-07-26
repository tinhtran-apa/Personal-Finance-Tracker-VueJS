import api from "@/services/api";
export const getDashboard = async (params) => {
  const response = await api.get("dashboards", { params });
  return response.data;
};

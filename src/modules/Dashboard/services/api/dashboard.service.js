import api from "@/services/api";
import { PATH } from "@/shared/constants/path.constant.js";

export const getDashboard = async (params) => {
  const response = await api.get(PATH.DASHBOARD.api.fetch, { params });
  return response.data;
};

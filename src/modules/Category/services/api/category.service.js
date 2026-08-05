import api from "@/services/api";
import { PATH } from "@/shared/constants/path.constant.js";

export const getCatagroies = async () => {
  const response = await api.get(PATH.CATEGORIES.api.fetch);
  return response.data;
};

export const createCategories = async (category) => {
  const response = await api.post(PATH.CATEGORIES.api.create, category);
  return response.data;
};

export const updateCategories = async (id, category) => {
  const response = await api.put(`${PATH.CATEGORIES.api.update}/${id}`, category);
  return response.data; 
};

export const deleteCategories = async (id) => {
    const response = await api.delete(`${PATH.CATEGORIES.api.delete}/${id}`);
    return response.data
}

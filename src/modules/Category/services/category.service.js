import api from "@/services/api";

export const getCatagroies = async () => {
  const response = await api.get("categories");
  return response.data;
};

export const createCategories = async (category) => {
  const response = await api.post("categories", category);
  return response.data;
};

export const updateCategories = async (id, category) => {
  const response = await api.put(`categories/${id}`, category);
  return response.data; 
};

export const deleteCategories = async (id) => {
    const response = await api.delete(`categories/${id}`);
    return response.data
}
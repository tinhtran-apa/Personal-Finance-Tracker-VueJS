import api from "@/services/api";
export const getTransactions = async (params) => {
  const response = await api.get("transactions", { params });
  return response.data;
};

export const createTransactions = async (transaction) => {
  const response = await api.post("transactions", transaction);
  return response.data;
};

export const updateTransactions = async (id, transaction) => {
  const response = await api.put(`transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransactions = async (id) => {
  const response = await api.delete(`transactions/${id}`);
  return response.data;
};

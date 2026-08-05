import api from "@/services/api";
import { PATH } from "@/shared/constants/path.constant.js";

export const getTransactions = async (params) => {
  const response = await api.get(PATH.TRANSACTIONS.api.fetch, { params });
  return response.data;
};

export const createTransactions = async (transaction) => {
  const response = await api.post(PATH.TRANSACTIONS.api.create, transaction);
  return response.data;
};

export const updateTransactions = async (id, transaction) => {
  const response = await api.put(`${PATH.TRANSACTIONS.api.update}/${id}`, transaction);
  return response.data;
};

export const deleteTransactions = async (id) => {
  const response = await api.delete(`${PATH.TRANSACTIONS.api.delete}/${id}`);
  return response.data;
};

export const summaryByCategories = async (params) => {
  const response = await api.get(PATH.TRANSACTIONS.api.summaryByCategory, { params });
  return response.data;
};

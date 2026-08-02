import {
  createTransactions,
  deleteTransactions,
  updateTransactions,
} from "../services/api/transaction.service.js";
import { toast } from "vue3-toastify";
import { validateCreateOrEditTransaction } from "../validators/transaction.valdiate.js";

export const useCRUD = (dialog, paginateTransaction) => {
  const handleTransaction = async () => {
    try {
      dialog.loading.value = true;
      const result = validateCreateOrEditTransaction(dialog.forms);
      dialog.errors.value = result || {};
      if (result) {
        return;
      }
      const payload = {
        amount: Number(dialog.forms.amount),
        type: dialog.forms.type,
        transactionDate: dialog.forms.transactionDate,
        categoryId: dialog.forms.categoryId,
        description: dialog.forms.description,
      };
      let response;
      if (dialog.id.value) {
        response = await updateTransactions(dialog.id.value, payload);
      } else {
        response = await createTransactions(payload);
      }
      toast.success(response.message);
      dialog.openOrCloseDialogCreateEdit();
      paginateTransaction();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dialog.loading.value = false;
    }
  };

  const deleteTransaction = async () => {
    try {
      dialog.loading.value = true;
      const response = await deleteTransactions(dialog.id.value);
      toast.success(response.message);
      dialog.closeDialogDelete();
      paginateTransaction();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dialog.loading.value = false;
    }
  };

  return {
    handleTransaction,
    deleteTransaction,
  };
};

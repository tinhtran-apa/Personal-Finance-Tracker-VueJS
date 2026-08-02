import { reactive, ref } from "vue";

export const useDialog = () => {
  const title = ref("Create category");
  const isOpen = ref(false);
  const isOpenDelete = ref(false);
  const loading = ref(false);
  const id = ref(null);
  const errors = ref({});
  const forms = reactive({
    amount: "",
    type: "EXPENSE",
    transactionDate: "",
    categoryId: "",
    description: "",
  });

  const resetForm = () => {
    forms.amount = "";
    forms.type = "EXPENSE";
    forms.transactionDate = "";
    forms.categoryId = "";
    forms.description = "";
    id.value = null;
  };

  const clearFieldError = (field) => {
    errors.value[field] = "";
  };

  const openOrCloseDialogCreateEdit = () => {
    resetForm();
    isOpen.value = !isOpen.value;
  };

  const closeDialogDelete = () => {
    resetForm();
    isOpenDelete.value = !isOpenDelete.value;
  };

  const openDialogDelete = (transactionId) => {
    id.value = transactionId;
    isOpenDelete.value = !isOpenDelete.value;
  };

  const openDialogEdit = (transaction) => {
    title.value = "Edit transaction";
    isOpen.value = true;
    id.value = transaction.id;
    forms.amount = transaction.amount;
    forms.type = transaction.type;
    forms.transactionDate = transaction.transactionDate;
    forms.categoryId = transaction.categoryId;
    forms.description = transaction.description;
  };

  return {
    title,
    isOpen,
    isOpenDelete,
    loading,
    id,
    errors,
    forms,
    resetForm,
    clearFieldError,
    openOrCloseDialogCreateEdit,
    closeDialogDelete,
    openDialogDelete,
    openDialogEdit,
  };
};

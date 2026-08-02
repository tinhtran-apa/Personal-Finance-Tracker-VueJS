import { reactive, ref } from "vue";

export const useDialog = () => {
  const title = ref("Create category");
  const isOpen = ref(false);
  const isOpenDelete = ref(false);
  const loading = ref(false);
  const id = ref(null);
  const errors = ref({});
  const forms = reactive({
    name: "",
    type: "EXPENSE",
    icon: "",
  });

  const resetForm = () => {
    forms.name = "";
    forms.type = "EXPENSE";
    forms.icon = "";
    id.value = null;
  };

  const openOrCloseDialogCreateEdit = () => {
    resetForm();
    isOpen.value = !isOpen.value;
  };

  const closeDialogDelete = () => {
    resetForm();
    isOpenDelete.value = !isOpenDelete.value;
  };

  const openDialogDelete = (categoryId) => {
    id.value = categoryId;
    isOpenDelete.value = !isOpenDelete.value;
  };

  const openDialogEditCategory = (category) => {
    title.value = "Edit category";
    isOpen.value = true;
    id.value = category.id;
    forms.name = category.name;
    forms.type = category.type;
    forms.icon = category.icon;
  };

  const clearFieldError = (field) => {
    errors.value[field] = "";
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
    openOrCloseDialogCreateEdit,
    closeDialogDelete,
    openDialogDelete,
    openDialogEditCategory,
    clearFieldError,
  };
};

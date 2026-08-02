import {
  createCategories,
  deleteCategories,
  updateCategories,
} from "../services/api/category.service.js";
import { toast } from "vue3-toastify";
import { validateCreateOrEditCategory } from "../validators/category.validate.js";

export const useCRUD = (dialog, fetchCategories) => {
  const handleCategories = async () => {
    try {
      dialog.loading.value = true;
      const result = validateCreateOrEditCategory(dialog.forms);
      dialog.errors.value = result || {};
      if (result) {
        return;
      }
      const payload = {
        name: dialog.forms.name,
        type: dialog.forms.type,
        icon: dialog.forms.icon,
      };
      let response;
      if (dialog.id.value) {
        response = await updateCategories(dialog.id.value, payload);
      } else {
        response = await createCategories(payload);
      }
      toast.success(response.message);
      dialog.openOrCloseDialogCreateEdit();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dialog.loading.value = false;
    }
  };

  const deleteCategory = async () => {
    try {
      dialog.loading.value = true;
      const response = await deleteCategories(dialog.id.value);
      toast.success(response.message);
      dialog.closeDialogDelete();
      fetchCategories();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dialog.loading.value = false;
    }
  };

  return {
    handleCategories,
    deleteCategory,
  };
};

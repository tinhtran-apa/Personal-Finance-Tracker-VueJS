import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/shared/constants/validation.contant.js";
import { CATEGORY_MESSAGE } from "@/shared/constants/category.message.js";
import { required, size } from "@/shared/validators";

export const validateCreateOrEditCategory = (form) => {
  const errors = {};
  errors.name =
    required(form.name, CATEGORY_MESSAGE.NAME_REQUIRED) ||
    size(form.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH, CATEGORY_MESSAGE.NAME_SIZE);
  errors.icon = required(form.icon, CATEGORY_MESSAGE.ICON_REQUIRED);
  errors.type = required(form.type, CATEGORY_MESSAGE.TYPE_REQUIRED);
  if (!errors.name && !errors.icon && !errors.type) {
    return;
  }
  return errors;
};

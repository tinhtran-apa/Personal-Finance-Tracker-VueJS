import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@/shared/constants/validation.contant.js";

export const CATEGORY_MESSAGE = {
  NAME_REQUIRED: "Category name is required.",
  NAME_SIZE: `Category name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`,
  ICON_REQUIRED: "Category icon is required.",
  TYPE_REQUIRED: "Category type is required.",
};

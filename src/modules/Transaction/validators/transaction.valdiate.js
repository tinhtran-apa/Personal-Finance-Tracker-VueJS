import { TRANSACTION_MESSAGE } from "@/constants/transaction.message";
import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH } from "@/constants/validation";
import { greaterThan, required, size } from "@/shared/utils/rules";

export const validateCreateOrEditTransaction = (form) => {
  const errors = {};
  errors.amount =
    required(form.amount, TRANSACTION_MESSAGE.AMOUNT_REQUIRED) ||
    greaterThan(form.amount, TRANSACTION_MESSAGE.AMOUNT_POSITIVE);
  errors.type = required(form.type, TRANSACTION_MESSAGE.TYPE_REQUIRED);
  errors.transactionDate = required(form.transactionDate, TRANSACTION_MESSAGE.DATE_REQUIRED);
  errors.categoryId = required(form.categoryId, TRANSACTION_MESSAGE.CATEGORY_REQUIRED);
  errors.description = size(
    form.description,
    DESCRIPTION_MIN_LENGTH,
    DESCRIPTION_MAX_LENGTH,
    TRANSACTION_MESSAGE.DESCRIPTION_SIZE,
  );
  if (
    !errors.amount &&
    !errors.icon &&
    !errors.type &&
    !errors.transactionDate &&
    !errors.categoryId &&
    !errors.description
  ) {
    return;
  }
  return errors;
};

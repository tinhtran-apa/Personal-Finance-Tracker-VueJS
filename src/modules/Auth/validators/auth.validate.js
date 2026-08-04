import { AUTH_MESSAGE } from "@/shared/constants/auth.message.js";
import { PASSWORD_MIN_LENGTH } from "@/shared/constants/validation.contant.js";
import { accept, invalidEmail, match, required, size } from "@/shared/validators";

export const validateLogin = (form) => {
  const errors = {};
  errors.email =
    required(form.email, AUTH_MESSAGE.EMAIL_REQUIRED) || invalidEmail(form.email, AUTH_MESSAGE.INVALID_EMAIL);
  errors.password =
    required(form.password, AUTH_MESSAGE.PASSWORD_REQUIRED) ||
    size(form.password, PASSWORD_MIN_LENGTH, null, AUTH_MESSAGE.PASSWORD_SIZE);
  if (!errors.email && !errors.password) {
    return;
  }
  return errors;
};

export const validateRegister = (form) => {
  const errors = {};
  errors.fullName = required(form.fullName, AUTH_MESSAGE.NAME_REQUIRED);
  errors.email =
    required(form.email, AUTH_MESSAGE.EMAIL_REQUIRED) || invalidEmail(form.email, AUTH_MESSAGE.INVALID_EMAIL);
  errors.password =
    required(form.password, AUTH_MESSAGE.PASSWORD_REQUIRED) ||
    size(form.password, PASSWORD_MIN_LENGTH, null, AUTH_MESSAGE.PASSWORD_SIZE);
  errors.confirmPassword =
    required(form.confirmPassword, AUTH_MESSAGE.PASSWORD_REQUIRED) ||
    match(form.password, form.confirmPassword, AUTH_MESSAGE.PASSWORD_NOT_MATCH);
  errors.policy = accept(form.policy, AUTH_MESSAGE.POLICY_NOT_ACCEPT);
  if (!errors.email && !errors.password && !errors.fullName && !errors.confirmPassword && !errors.policy) {
    return;
  }
  return errors;
};

import { PASSWORD_MIN_LENGTH} from "./validation";

export const AUTH_MESSAGE = {
  NAME_REQUIRED: "Name is required.",
  EMAIL_REQUIRED: "Email is required.",
  INVALID_EMAIL: "Email is invalid.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_NOT_MATCH: "Password do not match.",
  PASSWORD_SIZE: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  POLICY_NOT_ACCEPT: `Policy not accept.`,
};

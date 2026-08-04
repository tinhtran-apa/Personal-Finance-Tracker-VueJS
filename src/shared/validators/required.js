export const required = (value, message) => {
  return String(value ?? "").trim() ? "" : message;
};

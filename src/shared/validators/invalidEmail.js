export const invalidEmail = (value, message) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? "" : message;
};

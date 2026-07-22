export const formatDate = (value) => {
  const date = new Date(value);
  const format = date.toISOString().split("T")[0];
  return format;
};

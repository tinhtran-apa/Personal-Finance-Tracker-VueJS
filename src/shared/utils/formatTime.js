export const formatTime = (value) => {
  const date = new Date(value);
  const format = date.toISOString().split("T")[1].split(".")[0];
  return format;
};

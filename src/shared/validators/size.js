export const size = (value, min, max, message) => {
  const length = String(value ?? "").trim().length;

  if (max) {
    return length >= min && length <= max ? "" : message;
  } else {
    return length >= min ? "" : message;
  }
};

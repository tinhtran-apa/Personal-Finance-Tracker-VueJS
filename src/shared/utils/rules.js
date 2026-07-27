export const required = (value, message) => {
  return String(value ?? "").trim() ? "" : message;
};

export const size = (value, min, max, message) => {
  const length = String(value ?? "").trim().length;

  if (max) {
    return length >= min && length <= max ? "" : message;
  } else {
    return length >= min ? "" : message;
  }
};

export const greaterThan = (value, message) => {
  return Number(value) > 0 ? "" : message;
};

export const invalidEmail = (value, message) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? "" : message;
};

export const match = (value, target, message) => {
  return value == target ? "" : message;
};

export const accept = (value, message) => {
  return value ? "" : message;
};

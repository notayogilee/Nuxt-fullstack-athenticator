import validator from "validator";

export const validateEmail = (email) => {
  if (!email || typeof email !== "string") {
    return { valid: false, message: "Email is required" };
  }

  const sanitized = validator.trim(email);

  if (!validator.isEmail(sanitized)) {
    return { valid: false, message: "Invalid email format" };
  }

  if (sanitized.length > 254) {
    return { valid: false, message: "Email too long" };
  }

  return { valid: true, sanitized };
};

export const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }

  if (password.length > 128) {
    return { valid: false, message: "Password too long" };
  }

  // Check for at least one letter and one number
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    return {
      valid: false,
      message: "Password must contain letters and numbers",
    };
  }

  return { valid: true };
};

export const validateUsername = (username) => {
  if (!username || typeof username !== "string") {
    return { valid: false, message: "Name is required" };
  }

  const sanitized = validator.trim(username);

  if (sanitized.length < 1 || sanitized.lenth > 100) {
    return {
      valid: false,
      message: "Name must be between 1 and 100 characters",
    };
  }

  // Escape HTML to prevent XSS
  const escaped = validator.escape(sanitized);

  return { valid: true, sanitized: escaped };
};

export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  let sanitized = validator.trim(input);

  sanitized = validator.escape(sanitized);

  return sanitized;
};

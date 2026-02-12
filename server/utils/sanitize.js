import mongoSanitize from "mongo-sanitize";

/**
 * Remove any keys that start with $ or contain .
 * Prevents NoSQL operator injection
 */
export const sanitizeObject = (obj) => {
  return mongoSanitize(obj);
};

/**
 * Ensure input is a plain string, not an object
 */
export const ensureString = (input) => {
  if (typeof input !== "string") {
    throw new Error("Expected string input");
  }
  return input;
};

/**
 * Remove MongoDB operators from user input
 */
export const removeMongoOperators = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const cleaned = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip keys that start with $ or contain .
    if (key.startsWith("$") || key.includes(".")) {
      continue;
    }

    //Recursively clean nested objects
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      cleaned[key] = removeMongoOperators(value);
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
};

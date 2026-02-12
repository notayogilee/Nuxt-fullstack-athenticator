import User from "../../models/User";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validation";
import { sanitizeObject, ensureString } from "../../utils/sanitize";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Sanitized entire body
  const sanitizedBody = sanitizeObject(body);

  // Validate request body exists
  if (!sanitizedBody || typeof sanitizedBody !== "object") {
    throw createError({
      statusCode: 400,
      message: "Invalid request body",
    });
  }

  // Extract and ensure they are strings (not objects with $ operators)
  let { email, password, username } = sanitizedBody;

  try {
    email = ensureString(email);
    password = ensureString(password);
    username = ensureString(username);
  } catch (err) {
    throw createError({
      statusCode: 400,
      message: "Invalid input format",
    });
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    throw createError({
      statusCode: 400,
      message: emailValidation.message,
    });
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw createError({
      statusCode: 400,
      message: passwordValidation.message,
    });
  }

  const usernameValidation = validateUsername(username);
  if (!usernameValidation.valid) {
    throw createError({
      statusCode: 400,
      message: usernameValidation.message,
    });
  }

  const existingUser = await User.findOne({
    email: emailValidation.sanitized.toLowerCase(),
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "An account with this email already exists. Please login.",
    });
  }
  // Create user with sanitized data
  try {
    const user = await User.create({
      email: emailValidation.sanitized.toLowerCase(),
      password,
      username: usernameValidation.sanitized,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (err) {
    console.error("Registration error: ", err);

    if (err.name === "ValidationError") {
      throw createError({
        statusCode: 400,
        message: Object.values(err.errors)[0].message,
      });
    }

    throw createError({
      statusCode: 400,
      message: "Failed to create account. Please try again.",
    });
  }
});

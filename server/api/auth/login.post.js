import User from "../../models/User";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword } from "../../utils/validation";
import { sanitizeObject, ensureString } from "../../utils/sanitize";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const sanitizedBody = sanitizeObject(body);

  if (!sanitizedBody || typeof sanitizedBody !== "object") {
    throw createError({
      statusCode: 400,
      message: "Invalid request body",
    });
  }

  let { email, password } = sanitizedBody;

  // Ensure inputs are strings, not objects
  try {
    email = ensureString(email);
    password = ensureString(password);
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: "Invalid credentials",
    });
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    throw createError({
      statusCode: 400,
      message: "Invalid credentials",
    });
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    throw createError({
      statusCode: 400,
      message: "Invalid credentials",
    });
  }

  const user = await User.findOne({
    email: emailValidation.sanitized.toLowerCase(),
  }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const config = useRuntimeConfig();
  const token = jwt.sign({ userId: user._id.toString() }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return {
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  };
});

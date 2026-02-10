import User from "../../models/User";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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
      ...user,
      passord: undefined,
    },
  };
});

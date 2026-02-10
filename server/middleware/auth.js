import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api/protected")) {
    const token = getCookie(event, "auth_token");

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECTRET);

      event.context.user = decoded;
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: "Invalid token",
      });
    }
  }
});

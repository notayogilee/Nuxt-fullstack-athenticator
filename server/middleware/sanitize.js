import { sanitizeObject } from "../utils/sanitize";

export default defineEventHandler(async (event) => {
  if (["POST", "PUT", "PATCH"].includes(event.method)) {
    const body = await readBody(event).catch(() => null);

    if (body && typeof body === "object") {
      const sanitized = sanitizeObject(body);
      event.context.sanitizedBody = sanitized;
    }
  }
});

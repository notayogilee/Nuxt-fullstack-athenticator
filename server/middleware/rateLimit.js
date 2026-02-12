const loginAttemps = new Map();

export default defineEventHandler((event) => {
  if (
    !event.path.startsWith("/api/auth/login") &&
    !event.path.startsWith("/api/auth/register")
  ) {
    return;
  }

  const ip =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.socket.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttemps = 5;

  if (!loginAttemps.has(ip)) {
    loginAttemps.set(ip, []);
  }

  const attemps = loginAttemps.get(ip).filter((time) => now - time < windowMs);

  if (attemps.length >= maxAttemps) {
    throw createError({
      statusCode: 429,
      message: "Too many attempts. Please try again later.",
    });
  }

  attemps.push(now);
  loginAttemps.set(ip, attemps);

  if (loginAttemps.size > 1000) {
    const cutoff = now - windowMs;
    for (const [key, times] of loginAttemps.entries()) {
      if (times.every((t) => t < cutoff)) {
        loginAttemps.delete(key);
      }
    }
  }
});

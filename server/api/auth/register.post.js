import User from "../../models/User";

export default defineEventHandler(async (event) => {
  const { email, password, username } = await readBody(event);

  if (!email || !password || !username) {
    throw createError({
      statusCode: 400,
      message: "Email, username and password are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "User alread exists. Please login.",
    });
  }

  const user = await User.create({ email, password, username });

  return {
    user: {
      ...user,
      password: undefined,
    },
  };
});

import mongoose, { sanitizeFilter } from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();

  try {
    (await mongoose.connect(config.MONGO_URI),
      {
        sanitizeFilter: true, // Sanitize filter queries
        autoIndex: process.env.NODE_ENV !== "production",
      });

    mongoose.set("strict", true);
    mongoose.set("strictQuery", true);

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB error: ", error);
  });

  nitroApp.hooks.hook("close", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  });
});

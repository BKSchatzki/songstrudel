import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected to database.");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch {}
};

import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    });
    isConnected = true;
    console.log("Connected to database.");
  } catch (err) {
    console.log(err);
  }
};

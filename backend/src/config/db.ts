import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env file");
}

const globalAny = globalThis as any;

if (!globalAny.mongoose) {
  globalAny.mongoose = { conn: null, promise: null };
}

const cached = globalAny.mongoose;

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;

    console.log("MongoDB connected:", mongoose.connection.name);

    return cached.conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // ❗ better than process.exit
  }
};

export default connectDB;
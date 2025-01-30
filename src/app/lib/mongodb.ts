import mongoose from "mongoose";

type MongooseConnection = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

const MONGODB_URI = "mongodb+srv://shyamshekar1992:FffTiZhFHT4ovt2Y@cluster0.071ac.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Global cache to prevent multiple connections
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached: MongooseConnection = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "travel_app", // Change to your database name
      })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// lib/database/index.ts
import mongoose from 'mongoose';
import { User, Department, Schedule, Store, Shift } from './models'; // Correct import

const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "dashboard",
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  // Import models to ensure they are registered
  User;
  Department;
  Schedule;
  Store;
  Shift;

  return cached.conn;
}

export default connectToDatabase;

import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jack_3d_portfolio';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB] Local MongoDB connection failed (${error.message}).`);
    console.log(`[Server] Resilient in-memory store activated for MERN stack endpoints.`);
  }
};

export const getDbStatus = () => ({
  connected: isMongoConnected,
  mode: isMongoConnected ? 'mongodb' : 'in-memory-fallback',
});

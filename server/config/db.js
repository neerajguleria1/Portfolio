import mongoose from "mongoose";

const RETRY_MS = 5000;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("❌ MONGO_URI/MONGODB_URI not set in environment");
    return;
  }

  const attempt = async () => {
    try {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(mongoUri);
      console.log("MongoDB Connected ✅");
    } catch (error) {
      console.error("❌ DB Error:", error.message);
      console.log(`Retrying in ${Math.floor(RETRY_MS / 1000)}s...`);
      setTimeout(attempt, RETRY_MS);
    }
  };

  attempt();
};

export default connectDB;

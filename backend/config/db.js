import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.log("MongoDB connection failed");
    console.error(err);
  }
};

export default connectDB;

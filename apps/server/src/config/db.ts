import mongoose from "mongoose";
import { MONGO_URI } from "../secrets";

export const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connnected to MongoDB");
};

import dotenv from "dotenv";
dotenv.config();

export const GROQ_API_KEY = process.env.GROQ_API_KEY!;
export const MONGO_URI = process.env.MONGO_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;

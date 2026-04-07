import express from "express";
import cors from "cors";
import morgan from "morgan";
import appRouter from "./routes/application";
import authRotuer from "./routes/auth";
import aiRotuer from "./routes/ai";
import { connectDB } from "./config/db";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRotuer);
app.use("/api/apps", appRouter);
app.use("/api/ai", aiRotuer);

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));

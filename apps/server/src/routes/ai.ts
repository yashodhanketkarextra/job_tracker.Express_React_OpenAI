import express from "express";
import { AiController } from "../controllers/ai";
import { authMiddleware as auth } from "../middleware/auth";

const controller = new AiController();
const router = express.Router();

router.post("/parse", auth, controller.parse);
router.post("/resume", auth, controller.suggest);

export default router;

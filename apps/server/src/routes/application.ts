import express from "express";
import { ApplicationController } from "../controllers/application";
import { authMiddleware as auth } from "../middleware/auth";

const controller = new ApplicationController();
const router = express.Router();

router.post("/", auth, controller.create);
router.get("/", auth, controller.read);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

export default router;

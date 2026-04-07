import type { Response } from "express";
import { Application } from "../models/Application";
import type { AuthRequest } from "../middleware/auth";

export class ApplicationController {
  create = async (req: AuthRequest, res: Response) => {
    const app = await Application.create({ ...req.body, userId: req.userId });
    res.json(app);
  };

  read = async (req: AuthRequest, res: Response) => {
    const apps = await Application.find({ userId: req.userId });
    res.json(apps);
  };

  update = async (req: AuthRequest, res: Response) => {
    const app = await Application.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.json(app);
  };

  delete = async (req: AuthRequest, res: Response) => {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  };
}

import type { Request, Response } from "express";
import bcyrpt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export class AuthController {
  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const hashed = await bcyrpt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json(user);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcyrpt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  };
}

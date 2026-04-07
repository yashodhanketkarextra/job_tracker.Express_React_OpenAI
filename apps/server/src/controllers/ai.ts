import type { Response, Request } from "express";
import { parseJD, generateResumeBulletes } from "../services/ai";

export class AiController {
  parse = async (req: Request, res: Response) => {
    try {
      const { jd } = req.body;

      if (!jd) throw new Error("Job Description is required");

      const data = await parseJD(jd);
      res.json(data);
    } catch (err) {
      console.error("AI Parse Error: ", err);
      res.status(500).json({
        message: "Failed to parse job description",
      });
    }
  };

  suggest = async (req: Request, res: Response) => {
    try {
      const { role, skills } = req.body;

      if (!role || !skills) throw new Error("Role and skills are required");

      const data = await generateResumeBulletes(role, skills);

      const bullets = data
        ?.split("\n")
        .map((b) => b.replace(/^[-•\d.]\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 5);

      res.json({ bullets });
    } catch (err) {
      console.error("AI Parse Error: ", err);
      res.status(500).json({
        message: "Failed to generate resume bullet points",
      });
    }
  };
}

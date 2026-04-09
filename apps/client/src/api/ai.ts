import type { IAiParseResponse, IAiSuggestResponse } from "@/types/ai";

import { api } from "./client";

export const parseJD = async (jd: string): Promise<IAiParseResponse> => {
  const res = await api.post("/ai/parse", { jd });
  return res.data;
};

export const generateResume = async (
  role: string,
  skills: string[],
): Promise<IAiSuggestResponse> => {
  // return {
  //   bullets: [
  //     "Designed and programmed core gameplay mechanics using Unity and C# for multiple successful mobile and console titles",
  //     "Optimized rendering pipelines and memory management, achieving a 30% performance boost across diverse hardware platforms",
  //     "Collaborated with artists and designers to integrate assets, implement UI/UX flows, and ensure cohesive player experiences",
  //     "Led the integration of online multiplayer features, including matchmaking, real-time networking, and server‑side anti‑cheat systems",
  //   ],
  // };
  const res = await api.post("/ai/resume", { role, skills });
  console.log(res.data);
  return res.data;
};

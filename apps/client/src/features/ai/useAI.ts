import { api } from "@/api/client";
import type { IAiParseResponse, IAiSuggestResponse } from "@/types/ai";

export const parseJD = async (jd: string): Promise<IAiParseResponse> => {
  const res = await api.post("/ai/parse", { jd });
  return res.data;
};

export const generateResume = async (
  role: string,
  skills: string[],
): Promise<IAiSuggestResponse> => {
  const res = await api.post("/ai/resume", { role, skills });
  return res.data;
};

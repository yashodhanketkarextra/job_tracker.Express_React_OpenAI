import { api } from "@/api/client";

export const parseJD = async (jd: string) => {
  const res = await api.post("/ai/parseJD", { jd });
  return res.data;
};

export const generateResume = async (role: string, skills: string[]) => {
  const res = await api.post("/ai/resume", { role, skills });
  return res.data;
};

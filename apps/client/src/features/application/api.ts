import { api } from "@/api/client";
import type { IApplication } from "@/types/applications";

export const fetchApps = async (): Promise<IApplication[]> => {
  const res = await api.get("/apps/");
  return res.data;
};

export const updateAppStatus = async (id: string, status: string) => {
  return api.put(`/apps/${id}`, { status });
};

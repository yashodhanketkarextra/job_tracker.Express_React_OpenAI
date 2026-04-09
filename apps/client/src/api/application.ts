import type { IApplication } from "@/types/applications";

import { api } from "./client";

export const fetchApps = async (): Promise<IApplication[]> => {
  const res = await api.get("/apps/");
  return res.data;
};

export const updateAppStatus = async (id: string, status: string) => {
  return api.put(`/apps/${id}`, { status });
};

export const deleteApp = async (id: string) => {
  return api.delete(`/apps/${id}`);
};

export const createApp = async (data: Partial<IApplication>) => {
  return api.post("/apps", { ...data, dateApplied: new Date() });
};

export const updateApp = async (id: string, data: Partial<IApplication>) => {
  return api.put(`/apps/${id}`, { ...data });
};

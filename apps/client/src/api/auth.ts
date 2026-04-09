import { api } from "./client";

export type IAuthForm = {
  email: string;
  password: string;
};

export const login = async (data: IAuthForm) => {
  const res = await api.post("/auth/login", { ...data });
  return res;
};

export const register = async (data: IAuthForm) => {
  const res = await api.post("/auth/register", { ...data });
  return res;
};

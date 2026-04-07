import { create } from "zustand";
import { setAuthHeader } from "@/api/client";

interface IAuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  token: localStorage.getItem("token"),

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthHeader(token);
    } else {
      localStorage.removeItem("token");
      setAuthHeader(null);
    }

    set({ token });
  },
}));

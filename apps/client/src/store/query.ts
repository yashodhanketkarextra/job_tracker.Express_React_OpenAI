import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import {
  createApp,
  fetchApps,
  updateApp,
  updateAppStatus,
} from "@/api/application";
import { login, register } from "@/api/auth";
import type { IApplication, Status } from "@/types/applications";

import { useAuthStore } from "./auth";

type AppData = Partial<IApplication>;

export const useApps = () => {
  const queryClient = useQueryClient();

  const getAppsQuery = useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      updateAppStatus(id, status),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["apps"] });
    },
  });

  const updateAppMutation = useMutation({
    mutationKey: ["update"],
    mutationFn: ({ id, payload }: { id: string; payload: AppData }) =>
      updateApp(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });

  const createAppMutation = useMutation({
    mutationKey: ["create"],
    mutationFn: ({ payload }: { payload: AppData }) => createApp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });

  return {
    getAppsQuery,
    updateStatusMutation,
    updateAppMutation,
    createAppMutation,
  };
};

export const useAuth = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const useLoginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === 200) {
        console.log("Login success");
        setToken(res.data.token);
        navigate({ to: "/board" });
      }
    },
    onError: (err: Error) => {
      console.log("Login failed: ", err.message);
    },
  });

  const useRegisterMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  return {
    useLoginMutation,
    useRegisterMutation,
  };
};

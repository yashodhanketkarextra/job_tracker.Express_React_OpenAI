import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes";
import "@/index.css";
import { useAuthStore } from "./store/auth";
import { setAuthHeader } from "./api/client";
// import App from "@/App.tsx";

const token = useAuthStore.getState().token;
setAuthHeader(token);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

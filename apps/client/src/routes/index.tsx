import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import BoardPage from "@/pages/board";
import LoginPage from "@/pages/login";

const rootRoute = createRootRoute({
  shellComponent: RootDocument,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (token) throw redirect({ to: "/board" });
  },
});

const boardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/board",
  component: BoardPage,
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (!token) throw redirect({ to: "/" });
  },
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([loginRoute, boardRoute]),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-between">
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}

import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import LoginPage from "@/pages/login";
import BoardPage from "@/pages/board";

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const boardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/board",
  component: BoardPage,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([loginRoute, boardRoute]),
});

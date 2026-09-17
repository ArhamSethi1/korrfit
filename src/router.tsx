import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // This is a one-page experience with its own anchor scrolling. Restoring
    // the initial position after hydration can pull someone back to the hero
    // if they start scrolling while startup assets are still arriving.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

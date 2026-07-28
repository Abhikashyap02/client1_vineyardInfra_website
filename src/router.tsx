import { QueryClient, dehydrate, hydrate } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false, // Prevent refetching when window gains focus
        refetchOnMount: false, // Prevent refetching on mount if data is already in cache
        retry: 1, // Retry once for transient network errors
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    dehydrate: () => {
      return {
        dehydratedState: dehydrate(queryClient),
      };
    },
    hydrate: (data: any) => {
      hydrate(queryClient, data.dehydratedState);
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

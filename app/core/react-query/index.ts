import { QueryClient } from "@tanstack/react-query";

/**
 * Create Query Client
 * */
export function createQueryClient() {
  if (__IS_SERVER__) {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 1000 * 60, // 60 seconds
          retry: 0,
        },
      },
    });
  }

  return new QueryClient({
    defaultOptions: {
      queries: {
        // This will avoid refetching data after hydration!
        staleTime: 1000 * 60, // 60 seconds
        retry: 0,
      },
    },
  });
}

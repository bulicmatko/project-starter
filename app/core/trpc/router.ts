import { router } from "~/core/trpc/init";

/**
 * tRPC Router
 * */
export const trpcRouter = router({
  // TODO: Add domain routers here!
});

/**
 * tRPC Router Type
 * */
export type TrpcRouter = typeof trpcRouter;

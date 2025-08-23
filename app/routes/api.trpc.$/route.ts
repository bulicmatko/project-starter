import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTrpcContext } from "~/core/trpc/context";
import { trpcRouter } from "~/core/trpc/router";

import { getAppContext } from "~/context";

import type { Route } from "./+types/route";

/**
 * tRPC Fetch Request Handler
 * */
function createTrpcFetchRequestHandler({
  context,
  request,
}: Route.LoaderArgs | Route.ActionArgs) {
  const { user, intl, ability } = getAppContext(context);

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: trpcRouter,
    createContext: () => {
      return createTrpcContext({
        user,
        intl,
        ability,
      });
    },
  });
}

/**
 * Loader
 * */
export function loader(args: Route.LoaderArgs) {
  return createTrpcFetchRequestHandler(args);
}

/**
 * Action
 * */
export function action(args: Route.ActionArgs) {
  return createTrpcFetchRequestHandler(args);
}

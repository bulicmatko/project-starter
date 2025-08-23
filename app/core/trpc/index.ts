import {
  createTRPCClient,
  httpBatchLink,
  httpLink,
  httpSubscriptionLink,
  splitLink,
} from "@trpc/client";
import { SuperJSON } from "superjson";

import type { TrpcRouter } from "~/core/trpc/router";

/**
 * Create tRPC Client
 * */
export function createTrpcClient({
  baseUrl = "",
  headers,
}: {
  baseUrl?: string;
  headers?: Record<string, string>;
} = {}) {
  if (__IS_SERVER__) {
    return createTRPCClient<TrpcRouter>({
      links: [
        httpBatchLink({
          url: `${baseUrl}/api/trpc`,
          transformer: SuperJSON,
          headers,
        }),
      ],
    });
  }

  return createTRPCClient<TrpcRouter>({
    links: [
      splitLink({
        condition: ({ type }) => type === "subscription",

        true: httpSubscriptionLink({
          url: `${baseUrl}/api/trpc`,
          transformer: SuperJSON,
        }),

        false: httpLink({
          url: `${baseUrl}/api/trpc`,
          transformer: SuperJSON,
          headers,
        }),
      }),
    ],
  });
}

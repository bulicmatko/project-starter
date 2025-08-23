import { createTRPCContext } from "@trpc/tanstack-react-query";

import type { TrpcRouter } from "../router";

/**
 * tRPC Provider and Hooks
 * */
export const {
  TRPCProvider: TrpcProvider,
  useTRPC: useTrpc,
  useTRPCClient: useTrpcClient,
} = createTRPCContext<TrpcRouter>();

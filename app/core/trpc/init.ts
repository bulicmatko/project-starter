import { TRPCError, initTRPC } from "@trpc/server";
import { SuperJSON } from "superjson";

import type { TrpcContext } from "~/core/trpc/context";
import type { TrpcMeta } from "~/core/trpc/meta";

/**
 * Resolve Error Data
 * */
function resolveErrorData(error: TRPCError) {
  switch (error.code) {
    case "UNAUTHORIZED": {
      return { message: "UNAUTHORIZED" };
    }

    case "FORBIDDEN": {
      return { message: "FORBIDDEN" };
    }

    case "BAD_REQUEST": {
      return { message: "BAD_REQUEST" };
    }

    default: {
      return null;
    }
  }
}

/**
 * tRPC
 * */
const t = initTRPC
  .context<TrpcContext>()
  .meta<TrpcMeta>()
  .create({
    transformer: SuperJSON,
    errorFormatter: ({ error, shape }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          ...resolveErrorData(error),
        },
      };
    },
  });

/**
 * tRPC Authenticated Middleware
 * */
const authenticated = t.middleware(({ ctx, next }) => {
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized!",
    });
  }

  return next({ ctx: { ...ctx, user } });
});

/**
 * tRPC Enabled Middleware
 * */
const enabled = t.middleware(({ ctx, next }) => {
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "USER_NOT_PROVIDED",
    });
  }

  if (!user.isEnabled) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Forbidden!",
    });
  }

  return next({ ctx: { ...ctx, user } });
});

/**
 * tRPC Admin Middleware
 * */
const admin = t.middleware(({ ctx, next }) => {
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "USER_NOT_PROVIDED",
    });
  }

  if (!user.isAdmin) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Forbidden!",
    });
  }

  return next({ ctx: { ...ctx, user } });
});

/**
 * tRPC Ability Middleware
 * */
const ability = t.middleware(({ ctx, meta, next }) => {
  const { user, ability } = ctx;

  if (meta?.ability && !meta.ability(ability)) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Forbidden!",
    });
  }

  return next({ ctx: { ...ctx, user } });
});

/**
 * tRPC Router
 * */
export const router = t.router;

/**
 * tRPC Middleware
 * */
export const middleware = t.middleware;

/**
 * tRPC Public Procedure
 * */
export const publicProcedure = t.procedure;

/**
 * tRPC Procedure
 * */
export const procedure = t.procedure
  .use(authenticated)
  .use(enabled)
  .use(ability);

/**
 * tRPC Admin Procedure
 * */
export const adminProcedure = t.procedure
  .use(authenticated)
  .use(enabled)
  .use(admin);

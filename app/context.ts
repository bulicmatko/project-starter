import type {
  unstable_MiddlewareFunction as MiddlewareFunction,
  unstable_RouterContextProvider as RouterContextProvider,
} from "react-router";
import { unstable_createContext as createContext, data } from "react-router";
import type { IntlShape } from "react-intl";

import type { QueryClient } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { createAbility } from "~/core/ability";
import type { User } from "~/core/auth";
import { getUserFromRequest } from "~/core/auth";
import { env } from "~/core/env";
import { getIntl } from "~/core/intl";
import { createQueryClient } from "~/core/react-query";
import { createTrpcClient } from "~/core/trpc";
import type { TrpcRouter } from "~/core/trpc/router";

/**
 * Router Context
 * */
type RouterContext = Readonly<RouterContextProvider>;

/**
 * App Context
 * */
const appContext = createContext<{
  queryClient: QueryClient;
  trpcClient: ReturnType<typeof createTRPCOptionsProxy<TrpcRouter>>;
  user: User | null;
  intl: IntlShape;
  ability: ReturnType<typeof createAbility>;
}>();

/**
 * Setup App Context
 * */
export function setupAppContext(): MiddlewareFunction {
  return async ({ request, context }, next) => {
    const queryClient = createQueryClient();
    const trpcClient = createTRPCOptionsProxy<TrpcRouter>({
      queryClient,
      client: createTrpcClient({
        baseUrl: env.APP_BASE_URL,
        headers: Object.fromEntries(request.headers),
      }),
    });

    const user = await getUserFromRequest(request);
    const intl = await getIntl(user?.preferences.locale);

    const ability = createAbility(user);

    context.set(appContext, {
      queryClient,
      trpcClient,
      user,
      intl,
      ability,
    });

    return next();
  };
}

/**
 * Get App Context
 * */
export function getAppContext(context: RouterContext) {
  return context.get(appContext);
}

/**
 * Get App Context With User Or Throw
 */
export function getAppContextWithUserOrThrow(context: RouterContext) {
  const { user, ...rest } = context.get(appContext);

  if (!user) {
    throw data({ code: "USER_NOT_PROVIDED" }, { status: 500 });
  }

  return { ...rest, user };
}

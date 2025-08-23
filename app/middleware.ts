import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";
import { data, redirect } from "react-router";

import { getAppContext, getAppContextWithUserOrThrow } from "~/context";

/**
 * Authenticated Middleware
 * */
export function authenticated({
  redirectKey = "redirect",
  redirectTo,
}: {
  redirectKey?: string;
  redirectTo: string;
}): MiddlewareFunction {
  return ({ context, request }, next) => {
    const { user } = getAppContext(context);

    const url = new URL(request.url);

    const origin = url.origin;
    const pathname = url.pathname;
    const searchParams = url.searchParams.toString();

    if (!user) {
      if (searchParams) {
        throw redirect(
          `${redirectTo}?${redirectKey}=${encodeURIComponent(
            `${origin}${pathname}?${searchParams}`,
          )}`,
        );
      }

      throw redirect(
        `${redirectTo}?${redirectKey}=${encodeURIComponent(
          `${origin}${pathname}`,
        )}`,
      );
    }

    return next();
  };
}

/**
 * Unauthenticated Middleware
 * */
export function unauthenticated({
  redirectKey = "redirect",
  defaultRedirectTo,
}: {
  redirectKey?: string;
  defaultRedirectTo: string;
}): MiddlewareFunction {
  return ({ context, request }, next) => {
    const { user } = getAppContext(context);

    const url = new URL(request.url);

    const redirectTo = url.searchParams.get(redirectKey);

    if (user) {
      if (redirectTo) {
        throw redirect(decodeURIComponent(redirectTo));
      }

      throw redirect(defaultRedirectTo);
    }

    return next();
  };
}

/**
 * Enabled Middleware
 * */
export function enabled(): MiddlewareFunction {
  return ({ context }, next) => {
    const { user } = getAppContextWithUserOrThrow(context);

    if (!user.isEnabled) {
      throw data({ code: "USER_NOT_ENABLED" }, { status: 403 });
    }

    return next();
  };
}

/**
 * Admin Middleware
 * */
export function admin(): MiddlewareFunction {
  return ({ context }, next) => {
    const { user } = getAppContextWithUserOrThrow(context);

    if (!user.isAdmin) {
      throw data({ code: "USER_NOT_ADMIN" }, { status: 403 });
    }

    return next();
  };
}

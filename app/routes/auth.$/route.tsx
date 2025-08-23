import { href, redirect } from "react-router";

import type { Route } from "./+types/route";

/**
 * Loader
 * */
export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const searchParams = url.searchParams.toString();

  if (searchParams) {
    throw redirect(`${href("/auth/sign-in")}?${searchParams}`);
  }

  throw redirect(href("/auth/sign-in"));
}

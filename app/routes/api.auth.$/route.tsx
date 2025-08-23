import { auth } from "~/core/auth";

import type { Route } from "./+types/route";

/**
 * Loader
 * */
export function loader({ request }: Route.LoaderArgs) {
  return auth.handler(request);
}

/**
 * Action
 * */
export function action({ request }: Route.ActionArgs) {
  return auth.handler(request);
}

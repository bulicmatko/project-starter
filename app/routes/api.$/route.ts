import { data } from "react-router";

import type { Route } from "./+types/route";

/**
 * Loader
 * */
// eslint-disable-next-line no-empty-pattern
export function loader({}: Route.LoaderArgs) {
  throw data({ message: "API Route Not Found!" }, { status: 404 });
}

/**
 * Action
 * */
// eslint-disable-next-line no-empty-pattern
export function action({}: Route.ActionArgs) {
  throw data({ message: "API Route Not Found!" }, { status: 404 });
}

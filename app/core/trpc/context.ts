import type { IntlShape } from "react-intl";

import type { createAbility } from "~/core/ability";
import type { User } from "~/core/auth";

/**
 * Create tRPC Context
 * */
export function createTrpcContext({
  user,
  intl,
  ability,
}: {
  user: User | null;
  intl: IntlShape;
  ability: ReturnType<typeof createAbility>;
}) {
  return { user, intl, ability };
}

/**
 * tRPC Context Type
 * */
export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;

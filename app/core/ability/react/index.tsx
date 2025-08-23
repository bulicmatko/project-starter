import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

import { createAbility } from "~/core/ability";
import type { User } from "~/core/auth";

/**
 * Ability
 * */
type Ability = ReturnType<typeof createAbility>;

/**
 * Ability Context
 * */
const AbilityContext = createContext<Ability | null>(null);

/**
 * Ability Provider
 * */
export function AbilityProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  const ability = useMemo(() => createAbility(user), [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

/**
 * Use Ability Hook
 * */
export function useAbility() {
  const ability = useContext(AbilityContext);

  if (!ability) {
    throw new Error("ABILITY_NOT_PROVIDED!");
  }

  return ability;
}

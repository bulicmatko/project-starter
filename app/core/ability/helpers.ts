import type { AbilityTuple } from "@casl/ability";
import { AbilityBuilder, PureAbility } from "@casl/ability";

import type { User } from "~/core/auth";

/**
 * Create Module Ability
 * */
export function createModuleAbility<T extends AbilityTuple>(
  factory: (args: { user: User | null; can: PureAbility<T>["can"] }) => void,
) {
  return (args: {
    user: User | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    can: any;
  }) => factory(args);
}

/**
 * Create App Ability
 * */
export function createAppAbility<T extends AbilityTuple>(
  factory: (args: { user: User | null; can: PureAbility<T>["can"] }) => void,
) {
  return (user: User | null) => {
    const { can, build } = new AbilityBuilder<PureAbility<T>>(PureAbility);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    factory({ user, can: can as any });

    const ability = build();

    return {
      can: ability.can.bind(ability),
      cannot: ability.cannot.bind(ability),
    };
  };
}

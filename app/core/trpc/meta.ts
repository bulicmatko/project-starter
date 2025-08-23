import type { createAbility } from "~/core/ability";

/**
 * tRPC Meta Type
 * */
export type TrpcMeta = {
  ability?: (props: ReturnType<typeof createAbility>) => boolean;
};

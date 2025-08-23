import { createModuleAbility } from "~/core/ability/helpers";

/**
 * Note Ability
 * */
export type NoteAbility =
  | ["read", "note"]
  | ["create", "note"]
  | ["update", "note"]
  | ["delete", "note"];

/**
 * Create Note Ability
 * */
export const createNoteAbility = createModuleAbility<NoteAbility>(
  ({ user, can }) => {
    if (!user?.isEnabled) return;

    if (user.permissions.includes("note:read") || user.isAdmin) {
      can("read", "note");
    }

    if (user.permissions.includes("note:create") || user.isAdmin) {
      can("create", "note");
    }

    if (user.permissions.includes("note:update") || user.isAdmin) {
      can("update", "note");
    }

    if (user.permissions.includes("note:delete") || user.isAdmin) {
      can("delete", "note");
    }
  },
);

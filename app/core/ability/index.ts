import { createAppAbility } from "~/core/ability/helpers";

import type { NoteAbility } from "~/domain/note/ability";
import { createNoteAbility } from "~/domain/note/ability";

/**
 * Ability
 * */
export type Ability =
  | NoteAbility
  | ["see", "dashboard-page"]
  | ["see", "user-preferences-page"]
  | ["see", "user-profile-page"];

/**
 * Create Ability
 * */
export const createAbility = createAppAbility<Ability>(({ user, can }) => {
  createNoteAbility({ user, can });

  if (user) {
    can("see", "dashboard-page");
  }

  if (user) {
    can("see", "user-preferences-page");
  }

  if (user) {
    can("see", "user-profile-page");
  }
});

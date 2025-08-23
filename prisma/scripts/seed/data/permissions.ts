/**
 * Permissions
 * */
export const permissions = [
  /**
   * Profile
   * */
  "profile:read",
  "profile:update",

  /**
   * Preferences
   * */
  "preferences:read",
  "preferences:update",

  /**
   * Note
   * */
  "note:read",
  "note:create",
  "note:update",
  "note:delete",
] as const;

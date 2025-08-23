import { permissions } from "./permissions";

/**
 * Roles
 * */
export const roles = [
  {
    name: "Default Role",
    description: "Created by the seed script.",
    permissions: [...permissions].filter(
      (permission) =>
        permission.startsWith("profile:") ||
        permission.startsWith("preferences:"),
    ),
  },
] as const;

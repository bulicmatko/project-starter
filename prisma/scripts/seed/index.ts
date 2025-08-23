import { consola } from "consola";

import { prisma } from "~/core/prisma";

import { createRole } from "../../utils/role";
import { createUser } from "../../utils/user";
import { roles } from "./data/roles";
import { users } from "./data/users";

/**
 * Seeding started...
 * */
consola.info("Seeding started...");

/**
 * Created Roles
 * */
const createdRoles = await Promise.all(
  roles.map((role) =>
    createRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    }),
  ),
);

/**
 * Create Users
 * */
const createdUsers = await Promise.all(
  users.map((user) =>
    createUser({
      email: user.email,
      password: user.password,
      profile: {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
      },
      preferences: {
        locale: user.preferences.locale,
        timezone: user.preferences.timezone,
        firstDayOfWeek: user.preferences.firstDayOfWeek,
        accentColor: user.preferences.accentColor,
        colorScheme: user.preferences.colorScheme,
      },
    }),
  ),
);

/**
 * Assign Roles to Users
 * */
await prisma.rolesOnUsers.createMany({
  data: createdUsers.flatMap(({ user }) =>
    createdRoles.map(({ role }) => ({
      roleId: role.id,
      userId: user.id,
    })),
  ),
});

/**
 * Seeding completed.
 * */
consola.success("Seeding completed.");

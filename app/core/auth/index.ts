import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import type { InferOutput } from "valibot";
import {
  array,
  boolean,
  nullable,
  number,
  object,
  parse,
  string,
} from "valibot";

import { env } from "~/core/env";
import { prisma } from "~/core/prisma";

/**
 * Auth
 * */
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced: {
    database: {
      generateId: false,
    },
    useSecureCookies: env.NODE_ENV === "production",
  },
  telemetry: {
    enabled: false,
  },
});

/**
 * User Schema
 * */
const UserSchema = object({
  id: string(),
  email: string(),
  emailVerified: boolean(),
  profile: object({
    avatarUrl: nullable(string()),
    displayName: string(),
    firstName: string(),
    lastName: string(),
    initials: string(),
  }),
  preferences: object({
    locale: string(),
    timezone: string(),
    firstDayOfWeek: number(),
    accentColor: string(),
    colorScheme: string(),
  }),
  isEnabled: boolean(),
  isAdmin: boolean(),
  permissions: array(string()),
});

/**
 * User
 * */
export type User = InferOutput<typeof UserSchema>;

/**
 * Get User From Request
 * */
export async function getUserFromRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return null;
  }

  const now = new Date();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      profile: {
        select: {
          avatarUrl: true,
          displayName: true,
          firstName: true,
          lastName: true,
        },
      },
      preferences: {
        select: {
          locale: true,
          timezone: true,
          firstDayOfWeek: true,
          accentColor: true,
          colorScheme: true,
        },
      },
      roles: {
        where: {
          OR: [
            { activeFrom: null, activeTo: null },
            { activeFrom: null, activeTo: { gte: now } },
            { activeFrom: { lte: now }, activeTo: null },
            { activeFrom: { lte: now }, activeTo: { gte: now } },
          ],
        },
        select: {
          role: {
            select: {
              permissions: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  if (!user.profile) {
    throw new Error("User profile not found!");
  }

  if (!user.preferences) {
    throw new Error("User preferences not found!");
  }

  return parse(UserSchema, {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
    profile: {
      avatarUrl: user.profile.avatarUrl,
      displayName:
        user.profile.displayName ??
        [user.profile.firstName, user.profile.lastName]
          .filter(Boolean)
          .join(" "),
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      initials: [
        user.profile.firstName.at(0),
        user.profile.lastName.at(0),
      ].join(""),
    },
    preferences: {
      locale: user.preferences.locale,
      timezone: user.preferences.timezone,
      firstDayOfWeek: user.preferences.firstDayOfWeek,
      accentColor: user.preferences.accentColor,
      colorScheme: user.preferences.colorScheme,
    },
    isEnabled: true, // TODO: Implement isEnabled logic!
    isAdmin: true, // TODO: Implement isAdmin logic!
    permissions: user.roles.flatMap(({ role }) => {
      return role.permissions?.split(",") ?? [];
    }),
  });
}

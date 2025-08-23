import { auth } from "~/core/auth";
import { prisma } from "~/core/prisma";

/**
 * Create User
 * */
export async function createUser({
  email,
  password,
  profile,
  preferences,
}: {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  preferences: {
    locale: string;
    timezone: string;
    firstDayOfWeek: number;
    accentColor: string;
    colorScheme: string;
  };
}) {
  const { user } = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: [profile.firstName, profile.lastName].filter(Boolean).join(" "),
    },
  });

  await prisma.$transaction([
    prisma.userProfile.create({
      data: {
        userId: user.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
      select: { userId: true },
    }),
    prisma.userPreferences.create({
      data: {
        userId: user.id,
        locale: preferences.locale,
        timezone: preferences.timezone,
        firstDayOfWeek: preferences.firstDayOfWeek,
        accentColor: preferences.accentColor,
        colorScheme: preferences.colorScheme,
      },
      select: { userId: true },
    }),
  ]);

  return {
    user: {
      id: user.id,
    },
  };
}

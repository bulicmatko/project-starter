import { PrismaClient } from "@prisma/client";

import { env } from "~/core/env";

/**
 * Prisma Client
 * */
export const prisma = new PrismaClient({
  datasourceUrl: env.POSTGRES_URL,
});

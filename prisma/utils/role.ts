import { prisma } from "~/core/prisma";

/**
 * Create Role
 * */
export async function createRole({
  name,
  description,
  permissions,
}: {
  name: string;
  description: string;
  permissions: string[];
}) {
  const role = await prisma.role.create({
    data: {
      name,
      description,
      permissions: permissions.join(","),
    },
    select: { id: true },
  });

  return {
    role: {
      id: role.id,
    },
  };
}

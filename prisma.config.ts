import path from "node:path";
import type { PrismaConfig } from "prisma";

/**
 * Prisma 6+ configuration. Keeps `prisma/schema.prisma` free of the deprecated
 * `package.json#prisma` key and pins the seed command.
 */
export default {
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
} satisfies PrismaConfig;

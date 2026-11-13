/**
 * OPTIONAL DATABASE ACCESS
 * ---------------------------------------------------------------------------
 * The site is static-first: every page renders from `src/data/*` and works with
 * no database at all. Prisma is an *optional* enhancement — when DATABASE_URL is
 * present and the client has been generated, live records override the static
 * fallbacks (e.g. freshly scraped university notices).
 *
 * Why: the previous build imported `@prisma/client` at module scope, so the whole
 * site failed to compile whenever the client wasn't generated, and the SQLite
 * datasource could never work on Vercel's read-only serverless filesystem.
 *
 * `getDb()` resolves at runtime and never throws. Callers treat `null` as
 * "use the static fallback".
 */

import type { PrismaClient } from "@prisma/client";

type DbClient = PrismaClient;

const globalForDb = globalThis as unknown as {
  __gitmDb?: DbClient | null;
  __gitmDbResolved?: boolean;
};

/**
 * Returns a connected Prisma client, or null when the database is not
 * configured / not generated / unreachable.
 */
export async function getDb(): Promise<DbClient | null> {
  if (globalForDb.__gitmDbResolved) return globalForDb.__gitmDb ?? null;

  globalForDb.__gitmDbResolved = true;

  if (!process.env.DATABASE_URL) {
    globalForDb.__gitmDb = null;
    return null;
  }

  try {
    // Dynamic import so a missing/un-generated client degrades instead of
    // breaking the build or the render.
    const mod = await import("@prisma/client");
    const client =
      globalForDb.__gitmDb ??
      new mod.PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      });

    // Verify the connection eagerly so a bad URL fails fast and quietly.
    await client.$queryRaw`SELECT 1`;

    globalForDb.__gitmDb = client;
    return client;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[gitm] Database unavailable — rendering static fallback content.",
        error instanceof Error ? error.message : error
      );
    }
    globalForDb.__gitmDb = null;
    return null;
  }
}

/**
 * Runs a database read and silently falls back when the database is absent or
 * the query fails. Marketing pages must never 500 because of a data problem.
 */
export async function withDb<T>(
  read: (db: DbClient) => Promise<T>,
  fallback: T
): Promise<T> {
  const db = await getDb();
  if (!db) return fallback;

  try {
    const result = await read(db);
    // An empty result set means "nothing new in the database" — prefer the
    // curated static content so pages are never blank.
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[gitm] Query failed, using static fallback.", error);
    }
    return fallback;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { syncGurugramUniversityNotices } from "@/lib/scraper/gurugram-univ";

export const dynamic = "force-dynamic";

/**
 * Validates the request against the CRON_SECRET environment variable.
 * Supports:
 *  1. Header: Authorization: Bearer <CRON_SECRET>
 *  2. Query Param: ?secret=<CRON_SECRET> or ?token=<CRON_SECRET>
 */
function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    // If not set, prevent unauthorized execution
    console.warn("⚠️ CRON_SECRET is not configured in environment variables.");
    return false;
  }

  // 1. Check Bearer token in Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.substring(7).trim();
    if (bearerToken === cronSecret) return true;
  }

  // 2. Check query params as fallback for external cron schedulers
  const { searchParams } = new URL(request.url);
  const querySecret = searchParams.get("secret") || searchParams.get("token");
  if (querySecret && querySecret.trim() === cronSecret) {
    return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing bearer token" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;

    const result = await syncGurugramUniversityNotices({
      limitPerCategory: limit,
    });

    return NextResponse.json({
      success: true,
      synced: result.synced,
      skipped: result.skipped,
      errors: result.errors,
      details: result.details,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Error during manual GET sync:", error);
    return NextResponse.json(
      {
        success: false,
        synced: 0,
        skipped: 0,
        errors: [(error as Error).message || "Unknown error during sync"],
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing bearer token" },
      { status: 401 }
    );
  }

  try {
    let limit: number | undefined;
    let customHtml: string | undefined;
    let sourceUrl: string | undefined;

    try {
      const body = await request.json();
      if (body.limit && typeof body.limit === "number") limit = body.limit;
      if (body.customHtml && typeof body.customHtml === "string") customHtml = body.customHtml;
      if (body.sourceUrl && typeof body.sourceUrl === "string") sourceUrl = body.sourceUrl;
    } catch {
      // Body may be empty on basic POST triggers
    }

    const result = await syncGurugramUniversityNotices({
      customHtml,
      sourceUrl,
      limitPerCategory: limit,
    });

    return NextResponse.json({
      success: true,
      synced: result.synced,
      skipped: result.skipped,
      errors: result.errors,
      details: result.details,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Error during manual POST sync:", error);
    return NextResponse.json(
      {
        success: false,
        synced: 0,
        skipped: 0,
        errors: [(error as Error).message || "Unknown error during sync"],
      },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NoticeCategory, NoticeSource, Prisma } from "@prisma/client";

// Dynamic route with HTTP caching
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Parse and validate query parameters
    const categoryParam = searchParams.get("category")?.toUpperCase();
    const sourceParam = searchParams.get("source")?.toUpperCase();
    const searchParam = searchParams.get("search")?.trim();

    const rawPage = parseInt(searchParams.get("page") || "1", 10);
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

    const rawLimit = parseInt(searchParams.get("limit") || "10", 10);
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, 100);

    const skip = (page - 1) * limit;

    // 2. Build Prisma where clause
    const where: Prisma.NoticeWhereInput = {};

    if (
      categoryParam &&
      Object.values(NoticeCategory).includes(categoryParam as NoticeCategory)
    ) {
      where.category = categoryParam as NoticeCategory;
    }

    if (
      sourceParam &&
      Object.values(NoticeSource).includes(sourceParam as NoticeSource)
    ) {
      where.source = sourceParam as NoticeSource;
    }

    if (searchParam) {
      where.title = {
        contains: searchParam,
      };
    }

    // 3. Execute count and paginated query in parallel
    const [total, notices] = await Promise.all([
      prisma.notice.count({ where }),
      prisma.notice.findMany({
        where,
        orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json(
      {
        success: true,
        data: notices,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch (error: unknown) {
    console.error("Error retrieving notices:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch notices",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

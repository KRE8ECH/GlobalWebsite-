/**
 * CONTENT RESOLUTION LAYER
 * ---------------------------------------------------------------------------
 * Every page reads through this module. It returns live database records when
 * the database is configured and populated, and curated static content
 * otherwise. It never throws — a marketing site must not 500 on a data error.
 */

import { withDb } from "@/lib/db";
import {
  fallbackEvents,
  fallbackNotices,
  fallbackPlacements,
} from "@/data/content";
import type { EventItem, Notice, NoticeCategory, NoticeSource, PlacementItem } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Notices                                                                    */
/* -------------------------------------------------------------------------- */

type DbNotice = {
  id: string;
  title: string;
  category: string;
  source: string;
  publishDate: Date;
  pdfUrl: string | null;
  sourceUrl: string | null;
  isPinned: boolean;
};

function toNotice(row: DbNotice): Notice {
  return {
    id: row.id,
    title: row.title,
    category: row.category as NoticeCategory,
    source: row.source as NoticeSource,
    // Serialise to ISO so server and client render identical strings.
    publishDate: new Date(row.publishDate).toISOString(),
    pdfUrl: row.pdfUrl,
    sourceUrl: row.sourceUrl,
    isPinned: row.isPinned,
  };
}

export async function getNotices(limit = 24): Promise<Notice[]> {
  const rows = await withDb<DbNotice[]>(
    (db) =>
      db.notice.findMany({
        orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
        take: limit,
      }) as unknown as Promise<DbNotice[]>,
    []
  );

  const notices = rows.length > 0 ? rows.map(toNotice) : fallbackNotices;
  return notices.slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/* Events                                                                     */
/* -------------------------------------------------------------------------- */

type DbEvent = {
  slug: string | null;
  title: string;
  summary: string;
  date: Date;
  location: string;
  imageUrl: string | null;
  tags: string;
};

function toEvent(row: DbEvent): EventItem {
  return {
    slug:
      row.slug ??
      row.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    title: row.title,
    summary: row.summary,
    date: new Date(row.date).toISOString(),
    location: row.location,
    imageUrl: row.imageUrl,
    tags: row.tags ? row.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
  };
}

export async function getEvents(limit = 12): Promise<EventItem[]> {
  const rows = await withDb<DbEvent[]>(
    (db) =>
      db.event.findMany({
        orderBy: { date: "desc" },
        take: limit,
      }) as unknown as Promise<DbEvent[]>,
    []
  );

  const events = rows.length > 0 ? rows.map(toEvent) : fallbackEvents;
  return events.slice(0, limit);
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents(50);
  return events.find((e) => e.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Placements                                                                 */
/* -------------------------------------------------------------------------- */

type DbPlacement = {
  id: string;
  studentName: string;
  company: string;
  packageLPA: number;
  designation: string;
  year: number;
  branch: string;
  photoUrl: string | null;
};

export async function getPlacements(limit = 8): Promise<PlacementItem[]> {
  const rows = await withDb<DbPlacement[]>(
    (db) =>
      db.placementHighlight.findMany({
        orderBy: { packageLPA: "desc" },
        take: limit,
      }) as unknown as Promise<DbPlacement[]>,
    []
  );

  const placements = rows.length > 0 ? rows : fallbackPlacements;
  return placements.slice(0, limit);
}

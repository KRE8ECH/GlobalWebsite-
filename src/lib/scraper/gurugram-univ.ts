import axios from "axios";
import * as cheerio from "cheerio";
import crypto from "crypto";
import { NoticeCategory, NoticeSource } from "@prisma/client";
import prisma from "@/lib/prisma";

export const GURUGRAM_UNIV_BASE_URL = "https://gurugramuniversity.ac.in";

export const GURUGRAM_UNIV_ENDPOINTS = {
  RESULTS: "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php",
  EXAMINATIONS: "https://gurugramuniversity.ac.in/allNotifications/examNotice/index.php",
  ADMISSIONS: "https://gurugramuniversity.ac.in/allNotifications/admissionNotice/index.php",
  GENERAL: "https://gurugramuniversity.ac.in/allNotifications/generalNotice/index.php",
} as const;

export type ScraperCategoryHint = "result" | "exam" | "admission" | "general";

export interface ScrapedNotice {
  title: string;
  publishDate: Date;
  pdfUrl?: string;
  sourceUrl: string;
  category: NoticeCategory;
  source: NoticeSource;
  isPinned: boolean;
  titleHash: string;
}

export interface SyncResult {
  synced: number;
  skipped: number;
  errors: string[];
  details?: {
    added: Array<{ title: string; category: string; pdfUrl?: string }>;
  };
}

/**
 * Safely resolves relative URLs to absolute Gurugram University URLs.
 */
export function resolveGurugramUrl(
  relativeOrAbsolute?: string | null,
  baseUrl: string = GURUGRAM_UNIV_BASE_URL
): string | undefined {
  if (!relativeOrAbsolute) return undefined;
  const trimmed = relativeOrAbsolute.trim();
  if (!trimmed || trimmed === "#" || trimmed.startsWith("javascript:")) {
    return undefined;
  }
  try {
    return new URL(trimmed, baseUrl).toString();
  } catch {
    return trimmed;
  }
}

/**
 * Normalizes title string and generates a SHA-256 hash for deduplication.
 */
export function hashTitle(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Maps notification title and endpoint hint to standard NoticeCategory enum.
 */
export function determineNoticeCategory(
  title: string,
  hint?: ScraperCategoryHint
): NoticeCategory {
  const lower = title.toLowerCase();

  // 1. Holiday & Breaks
  if (
    lower.includes("holiday") ||
    lower.includes("vacation") ||
    lower.includes("closed") ||
    lower.includes("reopen") ||
    lower.includes("gazetted holiday")
  ) {
    return NoticeCategory.HOLIDAY;
  }

  // 2. Admissions
  if (
    lower.includes("admission") ||
    lower.includes("counseling") ||
    lower.includes("counselling") ||
    lower.includes("merit list") ||
    lower.includes("seat allotment") ||
    lower.includes("application form") ||
    lower.includes("entrance test") ||
    hint === "admission"
  ) {
    return NoticeCategory.ADMISSION;
  }

  // 3. Exams, Results, and Datesheets
  if (
    lower.includes("result") ||
    lower.includes("re-evaluation") ||
    lower.includes("re-checking") ||
    lower.includes("examination") ||
    lower.includes("exam ") ||
    lower.includes("date sheet") ||
    lower.includes("datesheet") ||
    lower.includes("practical") ||
    lower.includes("theory") ||
    lower.includes("roll no") ||
    lower.includes("seating plan") ||
    hint === "result" ||
    hint === "exam"
  ) {
    return NoticeCategory.EXAM;
  }

  // 4. Academic Calendars & Teaching
  if (
    lower.includes("academic") ||
    lower.includes("calendar") ||
    lower.includes("syllabus") ||
    lower.includes("curriculum") ||
    lower.includes("class schedule") ||
    lower.includes("commencement of class") ||
    lower.includes("teaching department")
  ) {
    return NoticeCategory.ACADEMIC;
  }

  return NoticeCategory.GENERAL;
}

/**
 * Parses date string from Gurugram University badge (e.g. "2026-11-03" or "03-11-2026").
 */
export function parsePublishDate(rawDateText?: string | null): Date {
  if (!rawDateText) return new Date();
  const cleaned = rawDateText.trim();

  // Try ISO YYYY-MM-DD
  const isoMatch = cleaned.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) return d;
  }

  // Try DD-MM-YYYY or DD/MM/YYYY
  const dmyMatch = cleaned.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (dmyMatch) {
    const [, day, month, year] = dmyMatch;
    const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    if (!isNaN(d.getTime())) return d;
  }

  const fallback = new Date(cleaned);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
}

/**
 * Extracts notices from Gurugram University HTML document.
 * Supports both standard list structure (ul.list-group li) and fallback table layouts.
 */
export function parseNoticesFromHtml(
  html: string,
  sourceUrl: string,
  hint?: ScraperCategoryHint
): ScrapedNotice[] {
  const $ = cheerio.load(html);
  const notices: ScrapedNotice[] = [];
  const seenHashes = new Set<string>();

  // 1. Selector for standard Gurugram University list items
  const listItems = $("ul.list-group li, .admission-list-container li, ul li");

  listItems.each((_, el) => {
    const $item = $(el);
    const $link = $item.find("a").first();

    if ($link.length === 0) return;

    // Check for "NEW" badge or pin indicator
    const hasNewBadge =
      $item.find(".badge-new, span:contains('NEW')").length > 0 ||
      $link.text().includes("NEW");

    // Clean title by cloning and removing badge elements
    const $clonedLink = $link.clone();
    $clonedLink.find(".badge-new, .badge, .date, span").remove();
    let rawTitle = $clonedLink.text().replace(/\s+/g, " ").trim();

    // Remove leading emoji icon if present
    rawTitle = rawTitle.replace(/^[📄📌\s]+/, "").replace(/\s*NEW\s*$/i, "").trim();

    if (!rawTitle || rawTitle.length < 4) return;

    // Extract PDF download link
    const rawHref = $link.attr("href");
    const pdfUrl = resolveGurugramUrl(rawHref);

    // Extract publication date from .badge-date or nearby span
    const dateText =
      $item.find(".badge-date, .date, span[class*='date']").first().text().trim() ||
      $item.text().match(/\d{4}-\d{2}-\d{2}/)?.[0];

    const publishDate = parsePublishDate(dateText);
    const category = determineNoticeCategory(rawTitle, hint);
    const titleHash = hashTitle(rawTitle);

    if (seenHashes.has(titleHash)) return;
    seenHashes.add(titleHash);

    notices.push({
      title: rawTitle,
      publishDate,
      pdfUrl,
      sourceUrl,
      category,
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      isPinned: hasNewBadge,
      titleHash,
    });
  });

  // 2. Fallback for tabular notices (table tr) if list parsing yielded zero items
  if (notices.length === 0) {
    $("table tbody tr, table tr").each((_, tr) => {
      const $row = $(tr);
      const $link = $row.find("a").first();
      if ($link.length === 0) return;

      const rawTitle = $link.text().replace(/\s+/g, " ").trim();
      if (!rawTitle || rawTitle.length < 4) return;

      const pdfUrl = resolveGurugramUrl($link.attr("href"));
      const rowText = $row.text();
      const dateMatch = rowText.match(/(\d{4}-\d{2}-\d{2}|\d{2}[-/.]\d{2}[-/.]\d{4})/);
      const publishDate = parsePublishDate(dateMatch?.[0]);
      const category = determineNoticeCategory(rawTitle, hint);
      const titleHash = hashTitle(rawTitle);

      if (seenHashes.has(titleHash)) return;
      seenHashes.add(titleHash);

      notices.push({
        title: rawTitle,
        publishDate,
        pdfUrl,
        sourceUrl,
        category,
        source: NoticeSource.GURUGRAM_UNIVERSITY,
        isPinned: rowText.includes("NEW"),
        titleHash,
      });
    });
  }

  return notices;
}

/**
 * Fetches HTML from a remote URL with timeout and browser User-Agent headers.
 */
export async function fetchNotificationHtml(url: string, timeoutMs = 15000): Promise<string> {
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (GITM University Sync/1.0)",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
    timeout: timeoutMs,
  });
  return response.data;
}

/**
 * Main automated synchronization engine.
 * Fetches notifications across official portals, deduplicates against existing records,
 * and persists new notices into the Prisma database.
 */
export async function syncGurugramUniversityNotices(options?: {
  customHtml?: string;
  sourceUrl?: string;
  limitPerCategory?: number;
}): Promise<SyncResult> {
  const result: SyncResult = {
    synced: 0,
    skipped: 0,
    errors: [],
    details: { added: [] },
  };

  const candidateNotices: ScrapedNotice[] = [];

  // If custom HTML is provided (e.g. for offline testing or mock data)
  if (options?.customHtml) {
    try {
      const parsed = parseNoticesFromHtml(
        options.customHtml,
        options.sourceUrl || GURUGRAM_UNIV_ENDPOINTS.RESULTS,
        "result"
      );
      candidateNotices.push(...parsed);
    } catch (err: unknown) {
      result.errors.push(`Error parsing custom HTML: ${(err as Error).message}`);
    }
  } else {
    // Live multi-endpoint scrape
    const endpointsToScrape = [
      { url: GURUGRAM_UNIV_ENDPOINTS.RESULTS, hint: "result" as const },
      { url: GURUGRAM_UNIV_ENDPOINTS.EXAMINATIONS, hint: "exam" as const },
      { url: GURUGRAM_UNIV_ENDPOINTS.ADMISSIONS, hint: "admission" as const },
      { url: GURUGRAM_UNIV_ENDPOINTS.GENERAL, hint: "general" as const },
    ];

    for (const endpoint of endpointsToScrape) {
      try {
        const html = await fetchNotificationHtml(endpoint.url);
        const parsed = parseNoticesFromHtml(html, endpoint.url, endpoint.hint);
        const items = options?.limitPerCategory ? parsed.slice(0, options.limitPerCategory) : parsed;
        candidateNotices.push(...items);
      } catch (err: unknown) {
        result.errors.push(`Failed scraping ${endpoint.url}: ${(err as Error).message}`);
      }
    }
  }

  if (candidateNotices.length === 0) {
    return result;
  }

  try {
    // Retrieve existing notices from database for deduplication
    const existing = await prisma.notice.findMany({
      where: { source: NoticeSource.GURUGRAM_UNIVERSITY },
      select: { title: true, pdfUrl: true },
    });

    const existingPdfUrls = new Set(
      existing.map((n) => n.pdfUrl).filter(Boolean) as string[]
    );
    const existingTitleHashes = new Set(existing.map((n) => hashTitle(n.title)));

    for (const candidate of candidateNotices) {
      // Deduplicate: check existing pdfUrl or title hash
      const isDuplicatePdf = candidate.pdfUrl && existingPdfUrls.has(candidate.pdfUrl);
      const isDuplicateTitle = existingTitleHashes.has(candidate.titleHash);

      if (isDuplicatePdf || isDuplicateTitle) {
        result.skipped++;
        continue;
      }

      // Insert new notice
      await prisma.notice.create({
        data: {
          title: candidate.title,
          category: candidate.category,
          source: candidate.source,
          publishDate: candidate.publishDate,
          pdfUrl: candidate.pdfUrl,
          sourceUrl: candidate.sourceUrl,
          isPinned: candidate.isPinned,
        },
      });

      // Track newly inserted in-memory sets to prevent intra-batch duplicates
      if (candidate.pdfUrl) existingPdfUrls.add(candidate.pdfUrl);
      existingTitleHashes.add(candidate.titleHash);

      result.synced++;
      result.details?.added.push({
        title: candidate.title,
        category: candidate.category,
        pdfUrl: candidate.pdfUrl,
      });
    }
  } catch (dbErr: unknown) {
    result.errors.push(`Database error during sync: ${(dbErr as Error).message}`);
  }

  return result;
}


# GITM Gurugram — Website Audit & Rebuild Report

**Repository:** `KRE8ECH/GlobalWebsite-` (branch `arena/c86a27f2-globalwebsite`)
**Audit date:** 13 November 2026
**Reviewed at:** commit `605445d` (base) → rebuilt in `1cf164c`
**Scope:** full code review, build verification, factual verification against the
institute's own site, accessibility, performance, SEO and compliance.

---

## 0. Read this first: there were two websites

This is the single most important finding, and it changes how everything else
should be read.

| | **This repo** (`GlobalWebsite-`) | **The live site** (`KRE8ECH/GITM`) |
|---|---|---|
| Deployed? | **No** | **Yes** — `gitm-gurugram.vercel.app` |
| Structure | One very long single page | Multi-page (about, programmes, admissions, placements, campus, contact) |
| Data | Prisma + SQLite, scraped university notices | Hard-coded static data |
| Build status at audit | **FAILING** | Passing |
| Styling at audit | **Not generated** (see §1) | Working |

**Consequence:** the Vercel project (`gitm-gurugram`, id `prj_FQGnViYjWSKUSIYyCv19VlTaA833`)
is linked to the GitHub repo **`KRE8ECH/GITM`**, not to this repository. Anything
committed here — including this rebuild — **will not appear on the live site**
until that link is changed or the code is moved. This is tracked as **Action A1**
in `HANDOVER.md`.

The rebuild below keeps what this repo does better (the data layer, the scraper
design, the original photography and campus video) and adopts what the other repo
does better (real page structure and cleaner content), as you asked.

---

## 1. Severity-ranked findings

### 🔴 Critical — the site could not ship

**C1. The production build failed.**
`next build` aborted at the typecheck stage with 18 errors, all rooted in
`@prisma/client` failing to expose its generated types:

```
src/app/api/notices/route.ts(3,10): error TS2305:
  Module '"@prisma/client"' has no exported member 'NoticeCategory'.
prisma/seed.ts(1,24): ... has no exported member 'Department'.
src/lib/scraper/gurugram-univ.ts(4,10): ... has no exported member 'NoticeSource'.
```

Because `@prisma/client` was imported at **module scope** in four files, a single
missing `prisma generate` took down the entire application, not just the database
features.

*Fixed:* `src/lib/db.ts` resolves the client at runtime and degrades to static
content. The build is green with no database present.

**C2. Tailwind generated no utility classes — the site rendered unstyled.**
`next.config.ts` registered `@tailwindcss/turbopack` as a `*.css` loader *and*
`globals.css` imported `tailwindcss`, but no PostCSS config existed. The result:

```
before:  9,081 bytes of CSS — 0 utility classes (.bg-navy, .text-white, .grid: absent)
after:  58,066 bytes of CSS — all utilities present
```

Every page in production was unstyled text. This was invisible in reviews that
only checked "the build passed".

*Fixed:* removed the loader rule, added `postcss.config.mjs` with
`@tailwindcss/postcss`. Verified in the emitted stylesheet, not just the exit code.

**C3. The database schema could never work on Vercel.**
`datasource db { provider = "sqlite" }`. Vercel functions run on a read-only
filesystem, so every write (including every admission inquiry) would fail at
runtime — after the build passed.

*Fixed:* PostgreSQL datasource with `binaryTargets = ["native", "rhel-openssl-3.0.x"]`,
and the site no longer requires a database at all.

**C4. `/og-image.jpg` did not exist.**
Referenced by `metadata.openGraph.images`, `metadata.twitter.images` and the
JSON-LD `image` property. Every WhatsApp, LinkedIn and X share previewed as a
broken image — on the channel most Indian applicants actually use.

*Fixed:* generated a real 1200×630 branded image from the campus photograph.

### 🟠 High — wrong information published as fact

**H1. Campus area stated as 20 acres. It is 18.**
Thirteen occurrences across the site (`page.tsx`, `footer.tsx`,
`MapFlightCanvas.tsx`, …). The institute's own About page says:

> "The Campus is spread over **18 Acres** of land"

The other repo already says 18. Publishing a 2-acre overstatement in an
admissions context is a misrepresentation problem, not a typo.

**H2. Three different "highest package" figures on the same site.**

| Where | Claim |
|---|---|
| `PlacementTicker.tsx` header badge | ₹40.0 LPA |
| `PlacementTicker.tsx` default data | ₹28.5 LPA |
| `layout.tsx` OpenGraph description | ₹28.5 LPA |
| `placement-section` / JSON-LD | ₹47 LPA (in the other repo) |

The institute's published table gives ₹47 LPA for 2024 (engineering) and ₹21.5 LPA
(management). A parent comparing two pages of the same site would find this
alarming, and it is what an anti-ragging or consumer complaint would quote.

**H3. Wrong domain throughout.**
`https://gitm.ac.in` is used as the canonical URL, in all JSON-LD `@id` values,
`metadataBase`, `robots.ts` and `sitemap.ts`. The institute's domain is
**`gitmgurgaon.com`**. Every canonical tag and structured-data identifier was
pointing at a domain the institute does not control — a genuine SEO hijack risk.

**H4. Wrong founder and chairman attribution.**
The site attributed the founder image and chairman image without naming them.
The institute's site names **Mr. Surjeet Singh** (Founder & Managing Trustee) and
**Mr. Ravinder Tokas** (Chairman).

**H5. `sitemap.ts` listed URLs that return 404.**
It emitted `/programs/{slug}` for database rows, but no such route existed. It
also listed hash fragments (`/#programs`) which search engines ignore. Both
actively damage crawl trust.

### 🟡 Medium — missing, then shipped

**M1. There was only one page.** No `/about`, `/programmes`, `/admissions`,
`/placements`, `/contact`, and no programme detail pages — so the sitemap claimed
15 URLs that did not exist, and there was no page to rank for
"B.Tech admission Gurgaon".

**M2. Zero statutory pages.** No privacy notice, anti-ragging committee, ICC
(POSH), grievance redressal, SC/ST cell, or mandatory disclosure. UGC and AICTE
expect these to be publicly findable; their absence is both a compliance gap and
a trust signal to parents.

**M3. No error boundaries.** No `not-found.tsx`, `error.tsx` or
`global-error.tsx`. Any runtime error blanked the page with no route back.

**M4. Leads could be silently lost.** `submit-inquiry.ts` returned
`success: true` for honeypot hits *and* for honeypot-blocked submissions, and
converted every database error into a generic failure with no record anywhere.

**M5. Images: 11 MB, unoptimised.** 165 files straight from WordPress, including
nine `150x150` thumbnails being used as content images. No `next/image` usage
(14 bare `<img>` tags), so no responsive `srcset`, no AVIF/WebP.

**M6. 18 MB video autoplayed on page load.** The campus MP4 (`gitm_campus_tour.mp4`,
18 MB) autoplayed with `preload` default — a disaster on the mobile connections
most applicants use.

**M7. Render-blocking third-party fonts.** A Google Fonts `@import` in CSS,
which blocks first paint and fails entirely if fonts.googleapis.com is blocked.

**M8. No security headers.** No CSP, HSTS, `X-Frame-Options` or
`Permissions-Policy`. A college site publishing fee schedules is a routine
phishing-clone target.

**M9. Accessibility gaps.** No skip link; `forcedTheme="light"` made the theme
toggle dead code; icon-only buttons without accessible names; no focus trap on the
mobile drawer; `Date.now()` and `new Date()` called during render (hydration
mismatch risk).

### 🔵 Low

- Duplicate code trees (`components/` vs `src/components/`, `actions/` vs
  `src/actions/`, `lib/` vs `src/lib/`) with drift between copies.
- Unused dependencies (`next-themes`, `cmdk`, `cheerio`, `axios`) inflating install time.
- `vercel.json` cron pointing at `/api/sync`, which required a `CRON_SECRET`
  that defaults to nothing — the endpoint 401'd on every scheduled run.
- Placeholder hero CTA "Download Information Brochure" linked to `#inquiry`; no
  brochure exists.

---

## 2. What was built

### Verified data layer
`src/data/site.ts` is now the **only** place a figure, phone number, address or
claim lives. Components import from it; nothing is re-typed. Each value carries a
source comment. This structurally prevents H1–H4 from recurring.

`src/data/content.ts` holds notices, events, placements, recruiters and the
academic calendar — used when no database is configured.

`src/lib/content.ts` resolves database → static fallback and **never throws**.

### Pages (28 routes)
`/` · `/about` · `/about/leadership` · `/about/approvals` · `/programmes` ·
`/programmes/[slug]` ×15 · `/admissions` · `/admissions/fees` ·
`/admissions/scholarships` · `/placements` · `/campus-life` · `/events` ·
`/events/[slug]` ×6 · `/contact` · `/policies/[slug]` ×7 · 404 · error.

### Add-ons
- **Scholarship estimator** — merit slabs × programme fee, clearly labelled indicative.
- **Eligibility checker** — stream → eligible programmes.
- **Deadline countdown** — client-computed after mount, so no hydration mismatch.
- **Command palette** — indexes pages, programmes and notices locally; works offline.
- **Mobile action bar** — Call / WhatsApp / Apply, thumb-reachable.

### Quality gates (all passing)
```
npm run typecheck   → clean
npx eslint src      → 0 errors, 0 warnings
npm run build       → 45 static pages, 0 warnings
```
Playwright suite rewritten: route rendering, single-h1, alt-text, heading order,
control labelling, form validation, honeypot isolation, drawer focus/Escape.

---

## 3. Facts now published (and where they came from)

| Figure | Value used | Source |
|---|---|---|
| Established | 2008 | gitmgurgaon.com/about-us |
| Campus area | **18 acres** | gitmgurgaon.com/about-us |
| Built-up area | 3 lakh sq. ft. | gitmgurgaon.com/about-us |
| Computer labs / systems | 10 / 500+ | gitmgurgaon.com/about-us |
| Library | 20,000+ volumes | gitmgurgaon.com/about-us |
| Internet | 20 Mbps leased line | gitmgurgaon.com/about-us |
| Highest package (engg) | ₹47 LPA (2024) | gitmgurgaon.com/placements-highlights |
| Highest package (mgmt) | ₹21.5 LPA (2024) | gitmgurgaon.com/placements-highlights |
| Students placed (2024) | 850 | gitmgurgaon.com/placements-highlights |
| Founder | Mr. Surjeet Singh | gitmgurgaon.com/about-us/founders-message |
| Chairman | Mr. Ravinder Tokas | gitmgurgaon.com/about-us/chairmans-message |
| DTE code | 074 | institute letterhead / site footer |
| Admissions helpline | +91 95551 00100 | gitmgurgaon.com |
| General helpline | +91 80539 80002 / 0003 | gitmgurgaon.com |
| Domain | gitmgurgaon.com | gitmgurgaon.com |

### Two figures we deliberately did **not** publish
The institute's marketing blog claims **₹97 LPA highest package** and, elsewhere,
**100% placement / ₹15.5 LPA average / 750+ recruiters**. These contradict the
institute's own year-wise table (₹47 LPA, 850 placed, 2024) and third-party
aggregators. Because a college site's placement claims are the most commonly
challenged statement it makes, the rebuild publishes **only the year-wise table**,
with a visible source note. If the institute can produce the audited 2026 report
behind the ₹97 LPA figure, add it — see `HANDOVER.md` Action C2.

Similarly, "NAAC A++" appears on a third-party aggregator but **not** on the
institute's own site, so it was not added anywhere.

---

## 4. Performance: before → after

| Metric | Before | After |
|---|---|---|
| Image payload in repo | 11 MB | 5 MB |
| Largest image | 1920px, 299 KB JPEG/PNG | ≤1600px WebP, 144 KB max |
| Video on first load | 18 MB autoplaying | 0 bytes (poster + click-to-play) |
| Third-party font requests | 3 (Google Fonts) | 0 (self-hosted) |
| CSS shipped | 9 KB, 0 utilities | 58 KB, complete |
| Routes | 1 | 45 prerendered |
| `<img>` without dimensions | 14 | 0 (all `next/image`) |

---

## 5. Residual risks

1. **Deployment wiring (Action A1).** Until the Vercel project points at this repo,
   none of this is live. This is the highest-priority item in `HANDOVER.md`.
2. **Fees are placeholders.** `annualFeeInr` values were derived from aggregator
   figures and must be confirmed by the accounts office before the fees page is
   treated as authoritative. Every fee display carries a verification notice.
3. **Policy pages need named office-holders.** Each page marks, in amber, exactly
   what the institute must fill in (committee chairs, phone numbers, document links).
4. **`/videos/gitm_campus_tour.mp4` is 18 MB in Git.** Fine for now; move to a
   CDN or Vercel Blob if the repo grows.
5. **Placement photographs of named students.** These are already public on the
   institute's site, but publishing a student's name, photo and salary together
   needs consent on record.

---

## 6. If you only fix three things elsewhere

1. Point Vercel at the repo that actually contains the site you want live (A1).
2. Delete every hard-coded number from components; import from one data file.
3. Verify placement and campus claims against the institute's own published record
   before every session — not against a blog post.

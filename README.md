# GITM Gurugram — Website

Official website for the **Global Institute of Technology & Management**,
Farrukhnagar, Gurugram, Haryana.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
optional Prisma/PostgreSQL · Playwright.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

No environment variables are required. The site builds and renders completely
without a database.

```bash
npm run typecheck    # tsc --noEmit
npx eslint src       # 0 errors, 0 warnings
npm run build        # 45 prerendered pages
npm run test:e2e     # Playwright (builds and serves automatically)
```

---

## Architecture

**Static-first, database-optional.** Every page renders from the curated data in
`src/data/`. Prisma is an *enhancement*: if `DATABASE_URL` is set and contains
records, those override the static content. If the database is missing,
unreachable, not generated, or empty, the site renders the static content and
never throws.

This is deliberate. An earlier version imported `@prisma/client` at module scope
and read every page from SQLite — which cannot run on Vercel — so the site failed
to build whenever the client was not generated, and would have failed every
database write in production.

```
src/
├── app/                     routes (App Router)
│   ├── page.tsx             homepage
│   ├── about/               profile, leadership, approvals
│   ├── programmes/          catalogue + [slug] detail ×15
│   ├── admissions/          process, fees, scholarships
│   ├── placements/          year-wise record, recruiters, training
│   ├── campus-life/         facilities, hostel, academic calendar
│   ├── events/              events + [slug], notice board
│   ├── contact/             directory, map, enquiry form
│   ├── policies/            [slug] — 7 statutory pages
│   ├── sitemap.ts robots.ts
│   ├── not-found.tsx error.tsx global-error.tsx loading.tsx
│   └── layout.tsx           fonts, metadata, JSON-LD, shell
├── components/
│   ├── layout/              header, footer, mobile bar, page hero, CTA band
│   ├── home/                hero, stats, programmes, placements, notices,
│   │                        events, campus, tour, countdown, CTA
│   ├── admissions/          inquiry form, scholarship estimator, eligibility
│   ├── notices/             notice board
│   ├── search/              command palette
│   └── ui/                  button, badge, card, field
├── actions/                 submit-inquiry.ts (server action)
├── data/                    ← SINGLE SOURCE OF TRUTH
│   ├── site.ts              institute facts, programmes, leadership, socials
│   ├── content.ts           notices, events, placements, recruiters, calendar
│   ├── policies.ts          statutory page content
│   └── navigation.ts        nav, portals, footer links
└── lib/
    ├── db.ts                optional Prisma client (never throws)
    ├── content.ts           database → static fallback
    ├── validations.ts       Zod schemas
    ├── types.ts             shared UI types
    └── utils.ts             cn, date helpers
```

### The one rule

> **No figure, phone number, address or claim may be typed into a component.**

Everything comes from `src/data/site.ts`. Each value carries a comment naming its
source. This exists because the previous codebase published, simultaneously:
20 acres (actual 18), three different "highest package" figures, and a domain
(`gitm.ac.in`) the institute does not own.

---

## Content rules

| Rule | Reason |
|---|---|
| Publish only figures that appear in the institute's own publications | A college site's placement and campus claims are the most commonly challenged statements it makes |
| Unknown value → `null` → UI renders "Contact the office" | Never invent a number |
| Percentage/placement claims need a visible source note | Parents compare pages; contradictions destroy trust |
| Indicative calculators say "indicative" and link to a human | A calculator that looks official but is unverified is a consumer-protection problem |

---

## Optional integrations

### Database (not required)

```bash
# .env.local
DATABASE_URL="postgresql://user:pass@host:5432/gitm?sslmode=require"
```

```bash
npm run db:push      # create tables
npm run db:seed      # seed from src/data/*  (single source of truth)
```

PostgreSQL only — SQLite cannot run on Vercel's read-only serverless filesystem.

### Inquiry email delivery (not required)

```bash
RESEND_API_KEY="re_..."
INQUIRY_EMAIL_TO="admission@gitmgurgaon.com"
INQUIRY_EMAIL_FROM="GITM Website <website@gitmgurgaon.com>"
```

Delivery order is **database → email → server log**. The visitor always receives a
reference number, and the last-resort path additionally shows the helpline so a
lead is never silently lost.

See `.env.example` for the complete list.

---

## Deployment

The build is standard Next.js — Vercel needs no `vercel.json`.

1. Set `NEXT_PUBLIC_APP_URL=https://gitmgurgaon.com`.
2. Optionally set `DATABASE_URL` and/or the Resend variables.
3. Deploy, verify a preview, then move the domain.

⚠️ See `docs/HANDOVER.md` **Action A1** before deploying: the existing Vercel
project is currently linked to a *different* GitHub repository.

---

## Documentation

| File | Contents |
|---|---|
| `docs/AUDIT-REPORT.md` | Severity-ranked findings, before/after measurements, verified-source table |
| `docs/HANDOVER.md` | Action list, env vars, decisions taken, what was and was not verified |
| `docs/ANTIGRAVITY-PROMPTS.md` | Copy-paste prompt pack for continuing in Antigravity |
| `docs/TASKS.md` | Backlog by wave, with priorities and owners |
| `docs/DEPLOYMENT.md` | Deployment checklist |
| `docs/STEP-BY-STEP.md` | **Start here to go live** — step-by-step against your actual Vercel project |

---

## Licence and ownership

Content, photographs and the GITM name and crest belong to the institute.
Third-party company names and logos are the property of their respective owners
and appear only to indicate recruiting relationships.

# Antigravity Prompt Pack — GITM Gurugram Website

Copy-paste-ready prompts for continuing this work in Antigravity. Each prompt is
self-contained (Antigravity subagents inherit **no** conversation history, so every
prompt restates the facts it needs) and ends with a verification step, because
"it builds" is not proof.

**Read `docs/AUDIT-REPORT.md` first.** It explains what was wrong and why.

---

## How to use this pack

1. Work through **Wave 1 → Wave 4** in order. Later waves assume earlier ones landed.
2. Paste **exactly one prompt per task**. Do not merge them; each ends in a commit.
3. Every prompt has a `VERIFY` block. Run those commands before accepting the work.
4. Commit format is `type(scope): description` — one task, one commit.

### Standing context (paste at the top of a fresh Antigravity session)

```
PROJECT: GITM Gurugram institute website.
STACK: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4
       (PostCSS), Prisma 6 (PostgreSQL, OPTIONAL), Playwright.
REPO ROOT: the directory containing package.json and src/.
RULES:
 - Facts come ONLY from src/data/site.ts and src/data/content.ts. Never hard-code
   a phone number, fee, acreage, package figure or claim in a component.
 - Verified facts: established 2008; 18-acre campus (NOT 20); 3 lakh sq ft;
   10 computer labs / 500+ systems; 20,000+ library volumes; domain
   gitmgurgaon.com; DTE code 074; founder Mr. Surjeet Singh; chairman
   Mr. Ravinder Tokas; highest package 47 LPA (2024, engineering); 850 placed (2024).
 - The site must build and render with NO DATABASE and NO environment variables.
   The database is an optional enhancement, never a requirement.
 - Do not add a page, feature or claim that cannot be verified. If a fact is
   unknown, render "Contact the office" rather than guessing.
 - Accessibility is a requirement, not a nice-to-have: one <h1> per page, labelled
   controls, visible focus, alt text on every meaningful image.
GATES (all must pass before a task is complete):
   npm run typecheck && npx eslint src && npm run build
```

---

# Wave 1 — Deployment & correctness (do these first)

## 1.1 — Point Vercel at this repository

```
TASK: Resolve the deployment mismatch for the GITM website.

CONTEXT: The Vercel project "gitm-gurugram" (project id
prj_FQGnViYjWSKUSIYyCv19VlTaA833, team team_ZLpxqDpyyeIPDKTYV6pG4YAB) is linked
to the GitHub repo KRE8ECH/GITM. The work we want live is in KRE8ECH/GlobalWebsite-.
Nothing committed to GlobalWebsite- reaches production.

Do this:
1. Use the Vercel API/connector to get the project (get_project) and confirm the
   current git link (link.repo, link.productionBranch).
2. Report, do NOT guess: whether re-linking a project to a different repository is
   supported by the connector. If it is not, produce the exact manual steps for the
   Vercel dashboard (Settings -> Git -> Disconnect -> Connect Git Repository) plus
   the consequence list (env vars survive; deployment history stays; domain
   assignment must be re-checked).
3. List the environment variables currently on the project (list_env_vars) and
   state which of these the new code needs: NEXT_PUBLIC_APP_URL, DATABASE_URL
   (optional), RESEND_API_KEY (optional), INQUIRY_EMAIL_TO (optional).
   Do not read secret values.
4. Write docs/DEPLOYMENT.md with: required vars, optional vars, the cron decision
   (the old vercel.json cron pointed at /api/sync, which no longer exists and would
   401 on every run), and a rollback procedure.

VERIFY: docs/DEPLOYMENT.md exists; its var list matches what
`grep -rho "process\.env\.[A-Z_]*" src/` reports; no invented variable names.
```

## 1.2 — Delete the stale cron and confirm no dead routes

```
TASK: Remove every reference to routes that no longer exist.

CONTEXT: The previous build had /api/sync (a Vercel cron target) and /api/notices.
Both were deleted in favour of a static-first architecture. Any surviving cron
config, sitemap entry or robots rule referencing them will produce 404s in
production.

Do this:
1. grep -rn "api/sync\|api/notices\|/programs/" --include="*.ts" --include="*.tsx"
   --include="*.json" --include="*.md" . (exclude node_modules and .next).
2. Fix every live reference. Historical references inside docs/ are acceptable if
   they are clearly marked as history.
3. Confirm src/app/sitemap.ts lists only routes that exist: for each URL it emits,
   verify a matching file exists under src/app.
4. Confirm robots.ts disallows /api/ only if an /api/ directory exists; otherwise
   keep the rule with a comment explaining it is defensive.

VERIFY:
  npm run build
  npm run start -- --port 3000 &
  for p in $(grep -oE '\$\{baseUrl\}[^"]*' src/app/sitemap.ts | sed 's/\${baseUrl}//'); do
    printf "%s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$p)"
  done
Every status must be 200.
```

## 1.3 — Make the inquiry pipeline observable

```
TASK: Add structured logging and a health endpoint for admission inquiries.

CONTEXT: src/actions/submit-inquiry.ts falls back database -> email -> log. When
both the database and Resend are unconfigured, a lead exists only as a log line,
and the visitor is told to call the helpline. Right now there is no way for staff
to know that this happened.

Do this:
1. Add src/app/api/health/route.ts returning JSON:
   { ok: true, checks: { database: "configured"|"absent"|"error",
     email: "configured"|"absent", build: <git sha or "unknown"> } }
   It must not throw, must not leak secrets, and must return 200 even when
   everything is optional-and-absent. Cache-Control: no-store.
2. In submit-inquiry.ts, emit a single structured JSON line per submission:
   { event: "inquiry", channel, reference, programme, state, outcome }.
   NEVER include the applicant's name, email or phone in the log line.
3. Add a counter-free summary: log a WARN with the text
   "INQUIRY_DEGRADED" whenever channel === "log", so it is greppable in Vercel logs.

VERIFY:
  curl -s localhost:3000/api/health | jq .
  # submit the contact form once, then:
  # - confirm a JSON log line with no personal data
  # - confirm the response still gives the user a reference number
grep -c "INQUIRY_DEGRADED" <dev server output>
```

---

# Wave 2 — Content the institute must supply

## 2.1 — Fill in the statutory committee details

```
TASK: Complete the seven policy pages with real office-holder details.

CONTEXT: src/data/policies.ts renders /policies/[slug] for: privacy, terms,
mandatory-disclosure, anti-ragging, icc, grievance, reservation-cell. Each section
that still needs a fact carries a `todo` string which renders as an amber
"To be completed by the institute" notice. Those notices must not ship on a public
site — they are scaffolding.

Do this:
1. List every `todo` in src/data/policies.ts with the exact fact needed (file a
   report first, do not invent anything).
2. Replace each `todo` with real values ONCE SUPPLIED. If values are not supplied,
   leave the todo in place and instead:
   a. keep the amber notice, and
   b. add the page to a new docs/OUTSTANDING-CONTENT.md checklist.
3. Add the UGC anti-ragging helpline (1800-180-5522) and email (helpline@antiragging.in)
   as live links where they appear.
4. Ensure no policy page is in the sitemap until it has no `todo` left, OR keep it
   in the sitemap but set robots noindex for pages that still have a todo.

VERIFY: grep -c "todo:" src/data/policies.ts  (report the number; it must equal the
count in docs/OUTSTANDING-CONTENT.md)
```

## 2.2 — Confirm fees before publishing

```
TASK: Replace estimated fees with accounts-office figures, or mark the page clearly.

CONTEXT: Every programme in src/data/site.ts has annualFeeInr. Those values were
derived from third-party aggregators (e.g. B.Tech 95,400; MBA 90,000; B.Pharm
105,250) and are NOT confirmed by the institute. The fees page and programme pages
display them with a "verify before you pay" notice.

Do this:
1. Produce a table of every programme with its current annualFeeInr.
2. Read the values from a file named fees.confirmed.json at the repo root if it
   exists (schema: [{ "slug": "b-tech-cse", "annualFeeInr": 95400 }]); otherwise
   set annualFeeInr to null for programmes that are not confirmed, which makes the
   UI render "Contact the accounts office" — the honest state.
3. Never show a total programme cost ("Est. programme total") when the annual fee
   is null. Fix that column.
4. Add a build-time assertion in a test: no fee may be shown without a source.
   Suggest: a comment or a `feeSource` field per programme.

VERIFY:
  npm run typecheck && npm run build
  curl -s localhost:3000/admissions/fees | grep -c "Contact the accounts office"
  (must be > 0 if any fee is null)
```

## 2.3 — Verified placement report

```
TASK: Add the audited placement report, or remove the conflicting marketing figures.

CONTEXT: The institute's blog claims 97 LPA highest / 15.5 LPA average / 750+
recruiters / 100% placement. The institute's own year-wise table says 47 LPA
(2024, engineering) with 850 students placed. src/data/site.ts currently publishes
ONLY the year-wise table, with a source note. That is deliberate.

Do this:
1. If a signed/audited placement report for 2025-26 is supplied (PDF or figures),
   add it as src/data/placement-report.json with: year, stream, highestLpa,
   averageLpa, placed, eligible, recruiters, sourceUrl, verifiedBy, verifiedOn.
   Render it as a table on /placements with a link to the source document.
2. If no report is supplied, DO NOT add the 97 LPA figures. Instead add a clearly
   labelled section "How we report placement figures" explaining that the site
   publishes only the year-wise institutional table and that any higher figure
   quoted elsewhere should be verified with the Corporate Relations Centre.
3. Add `verifiedOn` display dates so the figures visibly age.

VERIFY: every number rendered on /placements traces to a field in
src/data/placement-report.json or placementStats in src/data/site.ts. Report the
mapping.
```

---

# Wave 3 — Conversion & experience

## 3.1 — Real application hand-off

```
TASK: Replace the placeholder brochure CTA and wire analytics-free conversion tracking.

CONTEXT: The hero previously had a "Download Information Brochure" button that
linked to #inquiry; no brochure exists. Real brochures/e-prospectus are usually a
PDF or the official portal.

Do this:
1. Add a `prospectus` entry to src/data/site.ts: { url: string | null,
   label, note }. If url is null, the UI must hide the CTA entirely rather than
   link somewhere misleading.
2. On /admissions, make the primary CTA the official portal
   (site.applyUrl) and the secondary the on-site enquiry form. Visitors who want
   the portal should never have to fill a form first.
3. Persist the pre-selected programme across pages using a URL search param
   (?programme=b-tech-cse) so a click from a programme page arrives pre-filled.
   Read it server-side where possible to avoid a client flash.

VERIFY: with prospectus.url = null, no "brochure" string appears in the rendered
HTML of "/". Then set a URL and confirm the button appears and its href matches.
```

## 3.2 — WhatsApp-first contact on mobile

```
TASK: Improve the mobile conversion path.

CONTEXT: src/components/layout/mobile-bar.tsx gives Call / WhatsApp / Apply.
Indian applicants overwhelmingly use WhatsApp, and the institute's number is
already wired in src/data/site.ts (whatsapp.href, prefilled message).

Do this:
1. Add a WhatsApp click-to-chat on programme detail pages with a message that
   names the programme:
   "Hi, I would like to know more about <PROGRAMME NAME> at GITM Gurugram."
   Build it from site.whatsapp.href by replacing the text param — do not hard-code
   a second number.
2. Ensure the mobile bar does not overlap the footer or the form's submit button
   (it is fixed; the layout already reserves h-16 — verify on /contact and
   /admissions at 390px width).
3. Add rel="noopener noreferrer" and an accessible name including the programme.

VERIFY: at 390x844 on /programmes/b-pharm, the WhatsApp link's href contains
"B.Pharm"; footer content is fully reachable; no horizontal scroll
(document.documentElement.scrollWidth <= clientWidth).
```

## 3.3 — Search that survives without JavaScript

```
TASK: Make the notice board and command palette resilient.

CONTEXT: src/components/notices/notice-board.tsx filters client-side; the full
list is in the HTML (good). src/components/search/command-menu.tsx indexes
primaryNav, programs and fallbackNotices locally (good, no backend).

Do this:
1. Add a server-rendered fallback for notice search: /events?q=... filters
   notices server-side (searchParams), so the OS-level find and crawlers both work,
   and a shared link reflects the query.
2. Keep the client filter as an enhancement, syncing to the URL with
   router.replace (no full navigation).
3. Add an empty state with a link to the general helpline.

VERIFY:
  curl -s "localhost:3000/events?q=scholarship" | grep -ci "scholarship"   # >0
  curl -s "localhost:3000/events?q=zzzznotfound" | grep -c "No notices"     # 1
```

---

# Wave 4 — Hardening & scale

## 4.1 — Rate-limit the inquiry form

```
TASK: Add abuse protection without adding friction.

CONTEXT: The only user-submitted form is the admission inquiry
(src/actions/submit-inquiry.ts). It has a honeypot but no rate limiting, so a bot
filling the form repeatedly writes rows to the database or floods the email channel.

Do this:
1. Implement a per-IP limiter using a short-lived store. Prefer Vercel's
   @vercel/firewall or an Upstash Redis token bucket; if neither is configured,
   fall back to an in-memory sliding window with a clear comment that it is
   per-instance and therefore best-effort on serverless.
2. Limits: 5 submissions per IP per 10 minutes, 20 per IP per day.
3. On limit: return a friendly message that includes the helpline, and log
   INQUIRY_RATE_LIMITED without personal data.
4. Do NOT apply the limiter to reading pages.

VERIFY: a script that POSTs the action 8 times in a loop shows the first 5 succeed
and the rest return the rate-limited message; the action still returns success for
a normal single submission.
```

## 4.2 — Structured data expansion

```
TASK: Extend JSON-LD for rich results.

CONTEXT: CollegeOrUniversity is emitted in src/app/layout.tsx; Course is emitted
per programme page. Missing: FAQPage, BreadcrumbList, Event, and Organization
contact points.

Do this:
1. Add BreadcrumbList JSON-LD generated from the same `crumbs` array each page
   already passes to PageHero — derive it from props so it cannot drift.
2. Add Event JSON-LD on /events/[slug].
3. Add FAQPage JSON-LD on /admissions for genuinely asked questions (documents,
   eligibility, hostels, fees). Answers must match visible on-page text — Google
   requires this and penalises mismatches.
4. Validate structure with the Rich Results Test shape; do not add ratings,
   review counts or aggregateRating (we have no verified reviews).

VERIFY: for each added page, extract the ld+json blocks and JSON.parse them
(a malformed block silently disables all structured data on the page).
```

## 4.3 — Move media off Git

```
TASK: Reduce repository weight and serve media from a CDN.

CONTEXT: public/videos/gitm_campus_tour.mp4 is 18 MB and public/images is ~5 MB.
Both are inside the Git history, which slows clones and inflates deployments.

Do this:
1. Upload the video to Vercel Blob (or Cloudflare R2 / S3) and reference it via
   an env var NEXT_PUBLIC_CAMPUS_VIDEO_URL, falling back to the local file.
2. Keep a poster image in the repo (small, needed for LCP).
3. Do NOT rewrite Git history — add the video to .gitignore only after the CDN URL
   is confirmed working in production, and note the removal in the changelog.
4. Add a <link rel="preload" as="image"> for the hero and video poster only — not
   for the video itself.

VERIFY: on a cold load of "/", the network panel shows no MP4 request until the
play button is clicked; total transferred kilobytes before first contentful paint
is under 500 KB on a throttled "Fast 3G" profile.
```

## 4.4 — Turn on tests in CI

```
TASK: Make the quality gates unskippable.

CONTEXT: The Playwright suite (tests/e2e/{navigation,inquiry,accessibility}.spec.ts)
targets the new routes. There is no CI configuration in this repo.

Do this:
1. Add .github/workflows/ci.yml with jobs:
   - verify: npm ci, npm run typecheck, npx eslint src, npm run build
   - e2e: after verify, npx playwright install --with-deps chromium, npm run test:e2e
   Cache node_modules and the Playwright browser.
2. Fail the workflow on any ESLint warning (--max-warnings=0) — the codebase
   currently has zero, so this locks that in.
3. Do not add secrets. If tests need DATABASE_URL, they must pass without it.

VERIFY: push a branch; confirm both jobs go green. Then deliberately introduce a
lint warning and confirm the job fails, then revert.
```

---

## Prompt recipes for common follow-ups

**Add a new programme**
```
TASK: Add programme <NAME> to the site.
CONTEXT: Programmes live ONLY in the `programs` array in src/data/site.ts. A
programme page is generated automatically by src/app/programmes/[slug]/page.tsx
via generateStaticParams, and the sitemap picks it up automatically.
SUPPLY: slug, name, shortName, department, level, durationYears, eligibility,
intake, annualFeeInr, description, highlights[].
RULES: Do not create a new page file. Do not edit the sitemap. If a figure is
unknown use null (renders "Contact the office"), never a guess.
VERIFY: npm run build lists the new slug under /programmes/[slug].
```

**Change a headline figure**
```
TASK: Update <FIGURE> everywhere it appears.
CONTEXT: All institutional figures live in src/data/site.ts. Components must not
contain the literal number. Run: grep -rn "<CURRENT VALUE>" src/ to find any
hard-coded copies and replace them with an import.
VERIFY: the greeting/heading renders the new value on /, /about and the relevant
detail page; grep finds no remaining literal.
```

**Report a bug**
```
TASK: Diagnose <SYMPTOM>.
CONTEXT: <ROUTE>, <BROWSER>, <STEPS>. Repo rules: one <h1> per page; all figures
from src/data/*; site must work with no database.
PROCESS: reproduce first, capture the actual error text, state the root cause in
one sentence, then fix the cause (not the symptom), then run the three gates.
Do not refactor unrelated files in the same commit.
```

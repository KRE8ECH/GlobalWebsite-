# Task Backlog

Ordered by dependency. Each row is one commit. Prompts for most of these are in
`docs/ANTIGRAVITY-PROMPTS.md`.

Legend: 🔴 blocking · 🟠 high · 🟡 medium · 🟢 low

---

## Wave 0 — Landed in this branch

| # | Task | Status |
|---|---|---|
| 0.1 | Fix build: make Prisma optional, runtime-resolve the client | ✅ |
| 0.2 | Fix Tailwind: PostCSS pipeline, restore utility generation | ✅ |
| 0.3 | SQLite → PostgreSQL with Vercel binary targets | ✅ |
| 0.4 | Unify all facts into `src/data/site.ts`; correct 18 acres, domain, packages, leadership | ✅ |
| 0.5 | Convert 165 images to WebP and serve via `next/image` | ✅ |
| 0.6 | Stop autoplaying the 18 MB video | ✅ |
| 0.7 | Self-host fonts, remove Google Fonts import | ✅ |
| 0.8 | Generate the missing `og-image.jpg` | ✅ |
| 0.9 | Add 28 routes incl. 15 programme pages and 7 policy pages | ✅ |
| 0.10 | Add add-ons: scholarship estimator, eligibility checker, countdown, command palette | ✅ |
| 0.11 | Inquiry pipeline: database → email → log, with honest user messaging | ✅ |
| 0.12 | 404 / error / global-error boundaries | ✅ |
| 0.13 | Security headers (CSP, HSTS, frame-deny, permissions) | ✅ |
| 0.14 | Accessibility: skip link, labelled controls, focus trap, single h1, heading order | ✅ |
| 0.15 | Rewrite Playwright suite + accessibility/responsive specs | ✅ |
| 0.16 | Fix real sitemap, robots, prune dead scripts and duplicate code trees | ✅ |

---

## Wave 1 — Deployment & correctness

| # | Task | Priority | Notes |
|---|---|---|---|
| 1.1 | Re-link Vercel to this repo (or merge code into `GITM`) | 🔴 | Nothing is live until this is done. See `HANDOVER.md` A1 |
| 1.2 | Confirm `NEXT_PUBLIC_APP_URL` on the project | 🔴 | Canonical/OG/sitemap correctness |
| 1.3 | Remove stale cron config referencing `/api/sync` | 🟠 | Prompt 1.2 |
| 1.4 | Add `/api/health` and structured inquiry logging | 🟡 | Prompt 1.3 |
| 1.5 | Run `npm run test:e2e` locally and fix any real failures | 🟠 | Could not run in the build sandbox |
| 1.6 | Open the preview deploy and check mobile at 390px | 🟠 | Visual confirmation |

## Wave 2 — Content the institute must supply

| # | Task | Priority | Owner |
|---|---|---|---|
| 2.1 | Anti-ragging committee names + numbers | 🟠 | Institute |
| 2.2 | ICC (POSH) chairperson + members | 🟠 | Institute |
| 2.3 | Grievance committee + portal link | 🟠 | Institute |
| 2.4 | SC/ST & equal opportunity cell | 🟠 | Institute |
| 2.5 | Confirmed fee structure | 🟠 | Accounts office |
| 2.6 | Faculty list | 🟡 | HR / HoDs |
| 2.7 | AICTE approval / EOA / affiliation documents | 🟡 | Registrar |
| 2.8 | Prospectus PDF URL | 🟡 | Admissions |
| 2.9 | Placement report (or decision not to publish ₹97 LPA) | 🟠 | CRC |
| 2.10 | Consent records for student placement photos | 🟡 | CRC / Legal |
| 2.11 | NAAC status confirmation | 🟡 | Institute |

## Wave 3 — Conversion & experience

| # | Task | Priority |
|---|---|---|
| 3.1 | Programme pre-selection via `?programme=` across pages | 🟠 |
| 3.2 | WhatsApp click-to-chat with programme name on detail pages | 🟠 |
| 3.3 | Server-rendered notice search (`/events?q=`) | 🟡 |
| 3.4 | Campus visit booking form (a second, distinct lead type) | 🟠 |
| 3.5 | Fee calculator: tuition + hostel + transport + one-time | 🟡 |
| 3.6 | Compare-two-programmes view | 🟢 |
| 3.7 | Hindi (`hi-IN`) locale for key pages | 🟡 |
| 3.8 | Alumni/testimonial section with real, attributed quotes | 🟡 |

## Wave 4 — Hardening & scale

| # | Task | Priority |
|---|---|---|
| 4.1 | Rate-limit the inquiry form | 🟠 |
| 4.2 | BreadcrumbList + Event + FAQPage JSON-LD | 🟡 |
| 4.3 | Move video/images to Vercel Blob or R2 | 🟡 |
| 4.4 | CI workflow enforcing typecheck + lint (0 warnings) + build + e2e | 🟠 |
| 4.5 | Uptime monitoring on `/` and `/api/health` | 🟡 |
| 4.6 | Optionally re-add the university-notice scraper as a Vercel cron | 🟢 |
| 4.7 | Admin view for inquiries (currently database-only) | 🟡 |
| 4.8 | Automated broken-link check in CI | 🟢 |

---

## Deliberately not planned

| Item | Why |
|---|---|
| Dark mode | Was force-disabled while still shipping the provider; adds QA surface for no user benefit on this audience |
| 3D galaxy / map-flight animation | Bundle cost, mobile jank, no institutional meaning. A Google Map embed with a static fallback does the job |
| AI chatbot | A wrong answer about fees or eligibility creates legal exposure; a real counsellor is better and cheaper |
| Star ratings / aggregate review displays | No verified review source. Inventing them breaches consumer law and Google's structured-data policy |
| Countdown timers that reset on refresh | Manufactured urgency on a college admission is unethical and, if challenged, indefensible |
| Publishing the ₹97 LPA figure | Contradicts the institute's own published table (₹47 LPA, 2024) |

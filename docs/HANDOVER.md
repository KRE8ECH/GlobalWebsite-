# Handover & Action List

**Status:** rebuild complete, verified locally, **not yet deployed.**
**Branch:** `arena/c86a27f2-globalwebsite`

---

## Action A1 — 🔴 Deploy this repository (blocking everything)

> **Full walkthrough: `docs/STEP-BY-STEP.md`** — written against the live Vercel
> project, with the verified project IDs, deployment states, domain situation and
> troubleshooting.

**The problem.** The Vercel project `gitm-gurugram`
(`prj_FQGnViYjWSKUSIYyCv19VlTaA833`) is linked to the GitHub repo
**`KRE8ECH/GITM`**. This work is in **`KRE8ECH/GlobalWebsite-`**. Until those are
connected, nothing here is live.

**Two further facts confirmed against the account on 13 Nov 2026:**
- The project has **no custom domain** — only `gitm-gurugram.vercel.app`. GitHub
  Pages is serving `gitmgurgaon.com`, so attaching that domain is a migration, not
  a toggle, and it must not break the institute's email DNS.
- The account has **no environment variables**, so `NEXT_PUBLIC_APP_URL` must be
  added or canonical URLs will fall back to the `.vercel.app` host.

**Option 1 — re-link the project (recommended if you want one site).**

1. Vercel dashboard → project `gitm-gurugram` → **Settings → Git**.
2. **Disconnect** the current repository.
3. **Connect Git Repository** → choose `KRE8ECH/GlobalWebsite-`.
4. Confirm **Production Branch** = `main`.
5. Push this branch and open a pull request; Vercel will build a preview URL.
6. Check the preview, then merge. Domains and environment variables are preserved.

**Option 2 — merge this code into `KRE8ECH/GITM`.**
Keeps the existing deployment wiring untouched. Copy `src/`, `public/`, the config
files and `package.json` across, resolving in favour of this version.

**Option 3 — new project.** Create a fresh Vercel project from
`KRE8ECH/GlobalWebsite-`, preview it, verify, then move the domain.

> Whichever you pick, **verify with a preview deployment before moving the domain.**
> The build is green locally, but the first real test of the asset pipeline and
> serverless runtime is a preview deploy.

---

## Action A2 — 🟠 Environment variables

The site runs with **zero** configuration. Set only what you want to enable.

| Variable | Required? | Effect if unset |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | **Yes** (set to `https://gitmgurgaon.com`) | Canonical tags, sitemap and OG URLs fall back to the constant in `src/data/site.ts` |
| `DATABASE_URL` | No | Pages render curated static content from `src/data/content.ts` |
| `RESEND_API_KEY` | No | Inquiries are logged only; users are shown the helpline |
| `INQUIRY_EMAIL_TO` | No | Defaults to `admission@gitmgurgaon.com` |
| `INQUIRY_EMAIL_FROM` | No | Defaults to Resend's onboarding sender |

**Lead safety note.** With neither a database nor Resend configured, an inquiry
exists only as a server log line and the visitor is told to call the helpline. For
a live admissions site, configure **at least one** of the two. Cheapest path:
a free Neon Postgres for `DATABASE_URL`, or a free Resend account for
`RESEND_API_KEY`.

---

## Action A3 — 🟠 Content the institute must supply

Every item below is marked in the code. Nothing was invented.

| # | Item | Where | Why it matters |
|---|---|---|---|
| C1 | Committee chairs, members, phone numbers for **Anti-Ragging**, **ICC (POSH)**, **Grievance**, **SC/ST cell** | `src/data/policies.ts` (`todo` fields) | UGC requires these to be publicly reachable. The pages currently show an amber "to be completed" notice |
| C2 | Current **fee structure** from the accounts office | `annualFeeInr` in `src/data/site.ts` | Current values came from aggregator sites. The UI warns, but they must be corrected |
| C3 | **Audited placement report** if the ₹97 LPA figure is to be published | see AUDIT-REPORT §3 | The site publishes only the year-wise table that the institute itself lists |
| C4 | **Faculty list** with designations and qualifications | `/policies/mandatory-disclosure` | AICTE mandatory disclosure expects it |
| C5 | Links to **AICTE approval letter, EOA report, affiliation order** | `/about/approvals` | Lets parents verify independently instead of trusting the brochure |
| C6 | **Prospectus / e-brochure PDF URL** | `site.prospectus` (add) | The old CTA said "Download Brochure" and downloaded nothing |
| C7 | **Consent on record** for named student placement photographs | `src/data/content.ts` | Name + photo + salary together is personal data under the DPDP Act |
| C8 | Confirm whether **NAAC accreditation** applies and at what grade | nowhere yet | One aggregator claims "A++"; the institute's own site does not. Not published |
| C9 | **Hostel and transport fee** schedule | `/campus-life#hostel` | Currently "ask for current rates" |

---

## Action A4 — 🟡 Decisions taken that you should review

1. **Debuggability over cleverness.** The database is optional. Pages read from
   `src/data/*` unless a database has data. This is why the site cannot 500.
2. **One page → twenty-eight routes.** The single long page became a real site
   hierarchy, because a one-pager cannot rank for individual programmes and gives
   parents nowhere to send a link.
3. **The 3D "celestial sphere", tilt cards and map-flight animation were removed.**
   They cost bundle size, hurt mobile performance, and the galaxy animation had no
   institutional meaning. If you want the map flight back, rebuild it as an
   `<iframe>` Google Map with a static fallback image — cheaper and accessible.
4. **Dark mode removed.** It was force-disabled (`forcedTheme="light"`) while still
   shipping the theme provider and toggle.
5. **No third-party analytics added.** The audit did not establish a lawful basis
   or a preference. If you want analytics, use Vercel Analytics (cookieless) and
   update the privacy notice accordingly.
6. **Photos compressed to WebP.** Originals are in Git history (`605445d`) if you
   ever need the full-resolution versions.

---

## Action A5 — 🟢 After launch

1. Submit `https://gitmgurgaon.com/sitemap.xml` in Google Search Console and Bing
   Webmaster Tools.
2. Verify the domain in the [Rich Results Test](https://search.google.com/test/rich-results)
   — `CollegeOrUniversity` and `Course` should validate.
3. Claim / update the Google Business Profile so the campus map and hours match
   the contact page.
4. Set up an uptime monitor on `/` and `/api/health` (if Action 1.3 is done).
5. Add a quarterly reminder: verify every figure in `src/data/site.ts` against the
   institute's own publications. The header comment lists the sources.

---

## What was verified locally

```
npm run typecheck        → clean
npx eslint src           → 0 errors, 0 warnings
npm run build            → 45 pages prerendered, 0 warnings
```

Route smoke test (all 21 checked routes returned the expected status):

```
/ 200   /about 200   /programmes 200   /programmes/b-tech-cse 200
/admissions 200   /admissions/fees 200   /admissions/scholarships 200
/placements 200   /campus-life 200   /events 200   /events/spardha-2026 200
/contact 200   /policies/privacy 200   /policies/mandatory-disclosure 200
/sitemap.xml 200   /robots.txt 200   /og-image.jpg 200
/nonexistent-page 404 (correct)
```

CSS output confirmed to contain real utilities (`.bg-navy`, `.grid-cols-12`,
`.text-crimson` present in the emitted stylesheet) — this is the check that the
previous build would have failed.

Security headers confirmed present on responses: CSP, HSTS, `X-Frame-Options: DENY`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

**Not verified locally (no browser in the build sandbox):** visual rendering,
Playwright execution, and behavioural checks in a real browser. Run
`npm run test:e2e` on your machine, and open the preview deployment before merging.

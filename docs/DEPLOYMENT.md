# Deployment Checklist

Work top to bottom. Do not skip step 1.

---

## 1. Fix the repository link (blocking)

The Vercel project `gitm-gurugram` currently builds from **`KRE8ECH/GITM`**.
This code lives in **`KRE8ECH/GlobalWebsite-`**.

- [ ] Vercel → project → **Settings → Git → Disconnect**
- [ ] **Connect Git Repository** → `KRE8ECH/GlobalWebsite-`
- [ ] Confirm **Production Branch** = `main`
- [ ] Push the branch; confirm Vercel creates a **preview** deployment
- [ ] Open the preview URL and verify it renders **styled** (if it looks like plain
      text, the Tailwind pipeline is broken — see "Known failure modes" below)
- [ ] Only then merge to `main`

> Do not move the domain until a preview is verified.

---

## 2. Environment variables

Set in Vercel → **Settings → Environment Variables** (Production, and Preview).

| Variable | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | **Yes** | `https://gitmgurgaon.com` |
| `DATABASE_URL` | No | PostgreSQL connection string (Neon/Supabase/Vercel Postgres) |
| `RESEND_API_KEY` | No | `re_…` |
| `INQUIRY_EMAIL_TO` | No | `admission@gitmgurgaon.com` |
| `INQUIRY_EMAIL_FROM` | No | `GITM Website <website@gitmgurgaon.com>` |

⚠️ Configure **at least one** of `DATABASE_URL` / `RESEND_API_KEY`. Without either,
an admission inquiry exists only as a server log line and the visitor is shown the
helpline instead of a confirmation.

- [ ] Variables set
- [ ] Redeploy after setting them (Vercel does not apply new vars to old builds)

---

## 3. Domain

- [ ] Confirm `gitmgurgaon.com` is the canonical domain (not `gitm.ac.in`)
- [ ] Add the domain to the project; set the apex as primary
- [ ] Decide the `www` redirect (recommend `www → apex`, 308)
- [ ] Confirm `NEXT_PUBLIC_APP_URL` matches the primary domain exactly
      (a mismatch breaks canonical tags, OG images and the sitemap)

---

## 4. Pre-launch verification

Run against the **preview URL**, not localhost.

- [ ] `/` renders styled, hero image visible, no layout shift
- [ ] Mobile at 390px: bottom action bar visible, no horizontal scroll
- [ ] Every nav link resolves (no dead links)
- [ ] `/programmes/b-pharm` loads with a preselected enquiry form
- [ ] Submit one enquiry end to end → reference number appears
- [ ] Confirm the enquiry arrived (database row **or** email **or** log line)
- [ ] `/nonexistent` returns a styled 404
- [ ] `/sitemap.xml` returns 200 and lists only real routes
- [ ] `/robots.txt` returns 200
- [ ] `/og-image.jpg` returns 200 and renders correctly when shared
- [ ] Check the WhatsApp link on a real phone
- [ ] Check the toll-free/tel links on a real phone

### Headers

```bash
curl -sI https://<preview-url>/ | grep -iE "content-security|x-frame|strict-transport|referrer|permissions"
```
- [ ] CSP, HSTS, `X-Frame-Options: DENY`, `Referrer-Policy`,
      `Permissions-Policy` all present

### Build hygiene

```bash
npm run typecheck   # clean
npx eslint src      # 0 errors, 0 warnings
npm run build       # 45 pages, 0 warnings
npm run test:e2e    # all green
```

---

## 5. Post-launch

- [ ] Google Search Console: add the property, submit `/sitemap.xml`
- [ ] Bing Webmaster Tools: submit the sitemap
- [ ] Rich Results Test on `/` and `/programmes/b-tech-cse` — validate
      `CollegeOrUniversity` and `Course`
- [ ] Update the Google Business Profile (address, hours, phone) to match `/contact`
- [ ] Configure uptime monitoring on `/` and `/api/health`
- [ ] Set a quarterly reminder to re-verify every figure in `src/data/site.ts`

---

## 6. Rollback

Vercel keeps previous deployments.

1. Project → **Deployments** → find the last known-good production deployment.
2. **⋯ → Promote to Production**.
3. If the cause is a bad environment variable, fix it first — promoting will not
   help if the config is wrong.

Record what broke and why in an issue before rolling forward again.

---

## Known failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Page renders as unstyled text | Tailwind pipeline broken — utilities not generated | Ensure `postcss.config.mjs` exists with `@tailwindcss/postcss`, and that `next.config.ts` has **no** `@tailwindcss/turbopack` loader rule. Verify emitted CSS is >20 KB |
| Build fails on `@prisma/client` types | Prisma client not generated (and `postinstall` skipped) | The site is designed to build anyway — confirm `src/lib/db.ts` is used instead of a direct import. `postinstall` is `prisma generate \|\| echo skipped` |
| Every page 500s with a database error | Something imports `prisma` directly instead of `getDb()` | `grep -rn "from \"@/lib/prisma\"" src/` must return nothing |
| Enquiries vanish | No database and no `RESEND_API_KEY` | Set one. Check logs for `INQUIRY_DEGRADED` |
| Fonts wrong / flash of unstyled text | `@fontsource` imports removed from `layout.tsx` | Restore the three imports |
| Canonical URLs point at the wrong domain | `NEXT_PUBLIC_APP_URL` unset or wrong | Fix the variable and redeploy |
| Videos/images slow | Asset moved into Git instead of a CDN | See `TASKS.md` 4.3 |

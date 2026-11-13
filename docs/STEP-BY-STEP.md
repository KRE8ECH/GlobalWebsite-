# Step-by-Step: Getting This Live

Written against your **actual** Vercel project, inspected on 13 Nov 2026.

---

## What I found in your account

| Thing | Where | Consequence for these steps |
|---|---|---|
| Project `gitm-gurugram` (`prj_FQGnViYjWSKUSIYyCv19VlTaA833`), team `kre-8-ech` | — | This is the project to reuse. Do **not** create a new one |
| Linked Git repo | **`KRE8ECH/GITM`**, branch `main` | ⚠️ Not this repo. **Step 2 is required** |
| Production deployment | `dpl_3fG7ECYjpsy84wXCukx7YxCQTvee` — READY, @ `df3c21e3` | Your current live site |
| Newest deployment | `dpl_4j4jSHgvvUgK4KugZgRZxTSFv3td` — **CANCELED** ("canceled through the Vercel API") | Harmless, but no rollback target — use the older one |
| Custom domains on the project | **only** `gitm-gurugram.vercel.app` | `gitmgurgaon.com` is **not** attached. Step 7 is new work |
| Domains in the Vercel account | **none** | The domain lives at a third-party registrar |
| Environment variables | **none** | Everything the new code needs is optional except one — Step 3 |
| Deployment protection | `ssoProtection: all_except_custom_domains` | ⚠️ Preview URLs need a Vercel login. Step 5 explains |
| `gitProviderOptions.createDeployments` | `"disabled"` | ⚠️ Pushes may not auto-deploy. Step 5 has the fallback |
| Node | 24.x, plan: Hobby | Fine |

**Read this in one line:** the project exists and works, but it builds the *other*
repository, has no domain attached to `gitmgurgaon.com`, and has no environment
variables. That is the whole job.

---

# Part A — Re-link and ship (the path I recommend)

Time: ~20 minutes, plus a Vercel build.

## Step 1 — Confirm you are the right account

1. Go to <https://vercel.com> and sign in as **`kre8ech@gmail.com`**.
2. Switch to the **`KRE8ECH`** team (top-left team switcher).
3. Open **`gitm-gurugram`**.

If you cannot see the team or the project, stop — you are in the wrong account,
and nothing below will behave as described.

---

## Step 2 — Point the project at this repository

> This is the step everything else depends on.

1. Project → **Settings** → **Git** (left sidebar).
2. Under *Connected Git Repository* you will see `KRE8ECH/GITM`.
3. Click **Disconnect**.
4. Click **Connect Git Repository**.
5. Authorise GitHub if prompted, then choose **`KRE8ECH/GlobalWebsite-`**
   (it is the newer repo, pushed today).
6. Set **Production Branch** = `main`.
7. Click **Save**.

**What survives:** environment variables, deployment history, project name,
`gitm-gurugram.vercel.app`, analytics IDs, cron config.
**What must be re-checked:** domain assignments (Step 7), and any Git-based
deploy hooks (you have none — `deployHooks: []`).

---

## Step 3 — Add the one environment variable the site wants

1. Project → **Settings** → **Environment Variables**.
2. Add:

   | Key | Value | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_APP_URL` | `https://gitmgurgaon.com` | Production, Preview |

3. Save.

That is genuinely the only required variable. The site builds and runs with
nothing else. Optional extras (do these later, not now):

- `RESEND_API_KEY` + `INQUIRY_EMAIL_TO` — emails you each enquiry.
- `DATABASE_URL` — stores enquiries in Postgres.

Without either, enquiries are written to the Vercel function log and the visitor
is shown the helpline. That is safe but not ideal for a live admissions site.

---

## Step 4 — Merge the pull request

I already opened it: **<https://github.com/KRE8ECH/GlobalWebsite-/pull/1>**

1. Open the PR link.
2. Read the description (it lists every change and the three passing gates).
3. Click **Merge pull request** → **Confirm merge**.

Do **not** merge before Step 2 is saved, or the build will fire against the wrong
repository and the merge will look like it did nothing.

---

## Step 5 — Watch the build

1. Vercel → project → **Deployments**. A build should start within seconds of the
   merge, for commit `6bbf59d`.
2. Wait for **Ready** (about 60–90 seconds).
3. **If no build starts** — your project has `createDeployments: "disabled"`,
   which suppresses automatic Git deploys. Force one:
   - Deployments → **⋯** next to the latest → **Redeploy**, or
   - push an empty commit:
     ```bash
     git commit --allow-empty -m "chore: trigger deploy" && git push origin main
     ```

### Reading the build log

Click the deployment → **Building**. What you want to see:

```
✓ Compiled successfully
✓ Generating static pages (45/45)
Route (app)
├ ○ /
├ ○ /about
...
```

**🚨 If you see this, the styling is broken — stop and read the next section:**

```
Warning: Parsing CSS source code failed
> 11 | @theme {
Unknown at rule: @theme
```

That exact warning is what the old config produced, and it means Tailwind is not
compiling. It should be impossible now (`postcss.config.mjs` exists and the
turbopack loader rule is gone), but if it reappears, check that the deploy is
actually building commit `6bbf59d` and not an older SHA.

---

## Step 6 — Verify the preview (5 checks, 3 minutes)

Click the deployment's **Visit** button.

> **If Vercel asks you to log in**, that is deployment protection
> (`all_except_custom_domains`). Either sign in with your Vercel account, or open
> **Settings → Deployment Protection** and set *Vercel Authentication* to
> **Standard Protection** (custom domains only). Keep it on for previews — you do
> not want a half-finished school site indexed.

| # | Check | Pass looks like |
|---|---|---|
| 1 | **Styling** | Navy header, white cards, images. The homepage should *not* look like a plain text document |
| 2 | **Mobile** | Open on your phone. Bottom bar with Call / WhatsApp / Apply appears, nothing overlaps |
| 3 | **An enquiry** | Go to `/admissions`, fill the form, submit. You should get a reference number |
| 4 | **A 404** | Visit `/anything-random` → styled "page not found" |
| 5 | **Headers** | In a terminal: `curl -sI <preview-url> | grep -i "content-security\|x-frame"` → both present |

If all five pass, the code is good. If #1 fails, nothing else matters — send me
the build log.

---

## Step 7 — Attach the real domain

⚠️ **`gitmgurgaon.com` is not currently on this Vercel account at all**, and the
project has no custom domain. So this is not a switch-over — it is a fresh DNS
setup. Two things must be true first:

**7a. Do you control the DNS?**

Check where `gitmgurgaon.com` is registered and who runs its nameservers. Look for
the registrar (GoDaddy / BigRock / Hostinger / Cloudflare) in whoever manages the
institute's email. Ask: *"who can change DNS records for gitmgurgaon.com?"*

- If the answer is **you or someone you can ask** → continue.
- If the answer is **the institute's existing web vendor and you cannot reach
  them** → you cannot complete this step today. Do Part B instead (Step 11), or
  keep using the `.vercel.app` URL and revisit.

**7b. What is currently serving `gitmgurgaon.com`?**

Open <https://gitmgurgaon.com> — the institute's current WordPress site. Attaching
the domain to Vercel **replaces it**. Do not do this unless that is the decision.

**Then:**

1. Project → **Settings** → **Domains** → **Add**.
2. Enter `gitmgurgaon.com` → **Add**.
3. Vercel shows the DNS records it needs. Typically:
   - `A` record, name `@`, value `76.76.21.21`
   - `CNAME` record, name `www`, value `cname.vercel-dns.com`
4. Add those at your DNS provider.
5. Also add `www.gitmgurgaon.com` in Vercel and set it to **redirect to the apex**
   (308). Pick one canonical host and stick to it.
6. Wait for verification (minutes to a few hours). Both domains show a green
   **Valid Configuration**.

**Before you change DNS, check where the institute's email lives.** If
`info@gitmgurgaon.com` is handled by the same DNS, do **not** delete the existing
`MX` records. Replace only `A`/`CNAME` for the web host. Losing the institute's
email to fix the website is a very bad trade — this is the single most common way
this migration goes wrong.

> `NEXT_PUBLIC_APP_URL` already says `https://gitmgurgaon.com`, so canonical tags,
> the sitemap and OG images will be correct the moment the domain resolves.

---

## Step 8 — Post-launch (30 minutes, do it this week)

1. **Google Search Console** → add property `gitmgurgaon.com` → submit
   `https://gitmgurgaon.com/sitemap.xml`.
2. **Bing Webmaster Tools** → same sitemap.
3. **Rich Results Test** (<https://search.google.com/test/rich-results>) on `/` and
   `/programmes/b-tech-cse`. Expect `CollegeOrUniversity` and `Course` to validate.
4. **Google Business Profile** → make the address, phone and hours match `/contact`.
5. **One real test enquiry** from a real phone, over mobile data. Confirm you
   received it (log, email or database).
6. Tell the admissions team the helpline is on every "we could not save this"
   message, so they know what a caller is referring to.

---

# Part B — If you cannot re-link the repo (Step 11)

Re-linking is a dashboard action I cannot perform through the API connector. If
the Vercel UI will not let you disconnect, this works just as well and keeps your
existing deployment wiring untouched:

1. On your machine, clone this repository and copy its contents **into** a checkout
   of `KRE8ECH/GITM`, replacing files:
   ```bash
   git clone https://github.com/KRE8ECH/GITM && cd GITM
   # copy src/, public/, docs/, package.json, package-lock.json,
   # next.config.ts, postcss.config.mjs, tsconfig.json, playwright.config.ts,
   # prisma/, prisma.config.ts, .env.example, README.md
   git checkout -b rebuild
   git add -A && git commit -m "Rebuild: verified content, real routes, fixed build"
   git push -u origin rebuild
   ```
2. Open a PR from `rebuild` → `main` on `GITM`, get a preview, verify with the
   Step 6 checklist, merge.
3. Vercel redeploys `GITM`'s `main` automatically — no project changes at all.

The catch: Vercel's production alias follows `GITM`, so any future work must land
there, not here. Decide which repo is canonical and delete or archive the other,
or you will be doing this again in six months.

---

# Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Preview looks like an unstyled 1995 page | Tailwind not compiling | Check the build log for `Unknown at rule: @theme`. Confirm the deployment SHA is `6bbf59d` |
| Build fails: `@prisma/client has no exported member` | Something imported Prisma directly | The site is designed to build without it — check `src/lib/db.ts` is used, and that `postinstall` ran |
| Every page 500s with a database error | A direct Prisma import, or a bad `DATABASE_URL` | Remove `DATABASE_URL` — the site should render the static content |
| Vercel asks for login on the preview URL | Deployment protection | Expected. Sign in, or use a custom domain |
| Enquiries never arrive | No database and no Resend key | Add one (Step 3). Search the function log for `INQUIRY_DEGRADED` |
| Canonical URLs still say `gitm-gurugram.vercel.app` | `NEXT_PUBLIC_APP_URL` not set, or not redeployed | Set it, then **redeploy** — env changes do not apply to existing builds |
| Merge did nothing on the live site | Step 2 not saved, or auto-deploy disabled | Redeploy manually (Step 5) |
| `gitmgurgaon.com` shows the old site | DNS not changed, or TTL not expired | Check `dig gitmgurgaon.com` — it should return the Vercel A record |
| Site down after DNS change | Old web host removed, records wrong | Roll back the `A`/`CNAME` at the registrar to the previous value; they still serve the old site |

---

# Rollback, any time

1. Vercel → project → **Deployments**.
2. Find `dpl_3fG7ECYjpsy84wXCukx7YxCQTvee` (READY, `df3c21e3`) — your current
   known-good production.
3. **⋯** → **Promote to Production**.

Note: the newer deployment `dpl_4j4jSHgvvUgK4KugZgRZxTSFv3td` is **CANCELED** and
cannot be promoted. `dpl_3fG7…` is your safety net, so do not delete it.

Nothing about this rebuild is destructive to data: no database schema migration
runs on deploy (Prisma generates but does not push), and the old site remains in
Git history.

---

# What I did and did not do

**Did:** inspected the project, Git link, deployments, domains, env vars, and
protection settings; pushed the branch; opened PR #1; wrote this guide.

**Did not:** re-link the repository, add a domain, create environment variables, or
deploy — those change production on your behalf and I have not been asked to.
Say the word and I will do the env var and the deployment; the repository re-link
is a dashboard action only you can complete.

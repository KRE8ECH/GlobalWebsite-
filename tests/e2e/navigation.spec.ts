import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", heading: /Building engineers, managers and pharmacists/i },
  { path: "/about", heading: /years of technical education/i },
  { path: "/programmes", heading: /Programmes & courses/i },
  { path: "/admissions", heading: /Admissions are open/i },
  { path: "/admissions/fees", heading: /Fee structure/i },
  { path: "/admissions/scholarships", heading: /scholarships/i },
  { path: "/placements", heading: /Placements & recruiters/i },
  { path: "/campus-life", heading: /acres in Farrukhnagar/i },
  { path: "/events", heading: /Events & notices/i },
  { path: "/contact", heading: /Talk to us/i },
  { path: "/policies/privacy", heading: /Privacy Notice/i },
  { path: "/policies/anti-ragging", heading: /Anti-Ragging/i },
];

test.describe("Every public route renders", () => {
  for (const route of routes) {
    test(`${route.path} loads with a single h1`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      // Exactly one h1 per page — a screen-reader and SEO baseline.
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(route.heading);
    });
  }

  test("unknown route returns a 404 page with navigation", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /does not exist/i })).toBeVisible();
  });
});

test.describe("Programme pages", () => {
  test("programme detail page shows eligibility and fees", async ({ page }) => {
    await page.goto("/programmes/b-tech-cse");
    await expect(page.getByRole("heading", { name: /Eligibility/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^Fees$/i })).toBeVisible();
  });

  test("invalid programme slug 404s", async ({ page }) => {
    const response = await page.goto("/programmes/not-a-real-course");
    expect(response?.status()).toBe(404);
  });
});

test.describe("Navigation and search", () => {
  test("header navigation reaches a programme page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Programmes", exact: true }).first().click();
    await expect(page).toHaveURL(/\/programmes$/);
  });

  test("command palette opens with Ctrl+K and finds a programme", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    const search = page.getByRole("dialog", { name: /search/i });
    await expect(search).toBeVisible();

    await search.getByRole("option").first().waitFor();
    await search.getByRole("textbox").fill("B.Pharm");
    await expect(search.getByRole("option").first()).toContainText(/Pharmacy|Pharm/i);
  });

  test("skip link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
  });
});

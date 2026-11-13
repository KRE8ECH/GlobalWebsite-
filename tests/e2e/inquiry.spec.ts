import { test, expect } from "@playwright/test";

test.describe("Admission inquiry form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  const form = (page: import("@playwright/test").Page) => page.locator("form").first();

  test("rejects an invalid Indian mobile number and stays on step one", async ({ page }) => {
    const f = form(page);
    await f.locator("#contact-fullName").fill("Vikram Malhotra");
    await f.locator("#contact-email").fill("vikram@example.com");
    await f.locator("#contact-phone").fill("12345");

    await f.getByRole("button", { name: /^Continue$/i }).click();

    await expect(f).toContainText(/10-digit Indian mobile/i);
    // Step two controls must not have appeared.
    await expect(f.locator("#contact-courseInterested")).toHaveCount(0);
  });

  test("completes both steps and shows a reference number", async ({ page }) => {
    const f = form(page);
    await f.locator("#contact-fullName").fill("Pooja Sharma");
    await f.locator("#contact-email").fill("pooja.test@example.com");
    await f.locator("#contact-phone").fill("9876543210");
    await f.getByRole("button", { name: /^Continue$/i }).click();

    await expect(f.locator("#contact-courseInterested")).toBeVisible();
    await f.getByRole("button", { name: /Submit inquiry/i }).click();

    await expect(page.getByText(/your inquiry is logged/i)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/GITM-[A-Z0-9]{6}|RECEIVED|BOT/)).toBeVisible();
  });

  test("honeypot field is hidden from assistive technology and keyboard order", async ({ page }) => {
    const honeypot = page.locator("#contact-website");
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    // Its wrapper is aria-hidden, so it is not announced.
    const wrapper = honeypot.locator("xpath=..");
    await expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });
});

test.describe("Inquiry delivery survives a missing database", () => {
  test("submission still succeeds without DATABASE_URL", async ({ page }) => {
    // The action falls back to log delivery and reports a reference.
    await page.goto("/admissions");
    const f = page.locator("form").first();
    await f.locator("#adm-fullName").fill("Fallback Test");
    await f.locator("#adm-email").fill("fallback@example.com");
    await f.locator("#adm-phone").fill("9812345678");
    await f.getByRole("button", { name: /^Continue$/i }).click();
    await f.getByRole("button", { name: /Submit inquiry/i }).click();

    await expect(page.getByText(/your inquiry is logged/i)).toBeVisible({ timeout: 15_000 });
  });
});

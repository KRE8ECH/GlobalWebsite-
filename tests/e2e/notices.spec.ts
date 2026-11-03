import { test, expect } from "@playwright/test";

test.describe("Live University Noticeboard E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Noticeboard renders and shows automated sync status", async ({ page }) => {
    const noticeSection = page.locator("#notices");
    await expect(noticeSection).toBeVisible();

    // Verify live sync indicator is present
    await expect(noticeSection).toContainText(/Live Circulars & Noticeboard/i);
    await expect(noticeSection).toContainText(/Automated Live Sync Active/i);
  });

  test("Split-view tabs switch between Gurugram University and GITM Campus", async ({
    page,
  }) => {
    const guTab = page.getByRole("tab", { name: /Gurugram University/i });
    const gitmTab = page.getByRole("tab", { name: /GITM Campus/i });

    await expect(guTab).toBeVisible();
    await expect(gitmTab).toBeVisible();

    // Default is Gurugram University
    await expect(guTab).toHaveAttribute("aria-selected", "true");

    // Click GITM Campus tab
    await gitmTab.click();
    await expect(gitmTab).toHaveAttribute("aria-selected", "true");
    await expect(guTab).toHaveAttribute("aria-selected", "false");
  });

  test("Category filter and search input filter notice cards", async ({ page }) => {
    const noticeSection = page.locator("#notices");

    // Category dropdown
    const categorySelect = noticeSection.getByLabel(/Filter notices by category/i);
    await expect(categorySelect).toBeVisible();

    // Select EXAM
    await categorySelect.selectOption("EXAM");

    // Verify that cards show EXAM category badge
    const examBadges = noticeSection.locator("span", { hasText: /^EXAM$/ });
    await expect(examBadges.first()).toBeVisible();

    // Search input
    const searchInput = noticeSection.getByLabel(/Search circulars/i);
    await searchInput.fill("Date Sheet");

    // Verify filtered card title
    await expect(noticeSection).toContainText(/Date Sheet/i);
  });

  test("PDF download links open in secure new tab", async ({ page }) => {
    const noticeSection = page.locator("#notices");
    const pdfLinks = noticeSection.locator('a:has-text("Download PDF")');

    if ((await pdfLinks.count()) > 0) {
      const firstLink = pdfLinks.first();
      await expect(firstLink).toHaveAttribute("target", "_blank");
      await expect(firstLink).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

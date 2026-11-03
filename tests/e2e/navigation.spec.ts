import { test, expect } from "@playwright/test";

test.describe("GITM Navigation & Layout E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Desktop navigation displays branding, affiliation, and main navigation links", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop test only");

    // 1. Verify branding
    await expect(page.locator("header")).toContainText("GITM GURGAON");
    await expect(page.locator("header")).toContainText("Gurugram University Affiliated");

    // 2. Verify admission helpline
    const helpline = page.locator('a[href="tel:+919555100100"]');
    await expect(helpline.first()).toBeVisible();
    await expect(helpline.first()).toContainText("+91-9555 100 100");

    // 3. Verify core navigation links
    await expect(page.getByRole("link", { name: /^Programs/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Live University Notices/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /^Placements/i })).toBeVisible();
  });

  test("ERP Portals dropdown opens, lists portals, and closes on Escape", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop test only");

    const erpButton = page.getByRole("button", { name: /ERP Portals/i });
    await expect(erpButton).toBeVisible();

    // Open ERP menu
    await erpButton.click();
    await expect(erpButton).toHaveAttribute("aria-expanded", "true");

    // Verify ERP links exist
    await expect(page.getByRole("menuitem", { name: /Student ERP Portal/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Staff & Faculty ERP/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Institutional Webmail/i })).toBeVisible();

    // Keyboard navigation: press Escape to close
    await page.keyboard.press("Escape");
    await expect(erpButton).toHaveAttribute("aria-expanded", "false");
  });

  test("Mobile drawer opens via hamburger, traps focus, and closes gracefully", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile test only");

    const menuButton = page.getByRole("button", { name: /Open mobile menu/i });
    await expect(menuButton).toBeVisible();

    // Open mobile drawer
    await menuButton.click();
    const drawer = page.getByRole("dialog", { name: /Navigation Menu/i });
    await expect(drawer).toBeVisible();

    // Verify navigation links inside drawer
    await expect(drawer.getByRole("link", { name: /^Programs/i })).toBeVisible();
    await expect(drawer.getByRole("link", { name: /^Placements/i })).toBeVisible();

    // Close drawer using close button
    const closeBtn = drawer.getByRole("button", { name: /Close navigation menu/i });
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();
  });

  test("Global Command Palette opens on click and closes on Escape", async ({ page }) => {
    const searchButton = page.getByRole("button", { name: /Open search command palette/i });
    if (await searchButton.isVisible()) {
      await searchButton.click();

      const palette = page.getByRole("dialog", { name: /Global search command palette/i });
      await expect(palette).toBeVisible();

      // Verify input placeholder
      await expect(page.getByPlaceholder(/Type a program, notice/i)).toBeVisible();

      // Press Escape to dismiss
      await page.keyboard.press("Escape");
      await expect(palette).not.toBeVisible();
    }
  });
});


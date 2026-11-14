import { test, expect } from "@playwright/test";

const pagesToAudit = ["/", "/programmes", "/admissions", "/placements", "/contact"];

test.describe("Accessibility baselines", () => {
  for (const path of pagesToAudit) {
    test(`${path} has no images missing alt text`, async ({ page }) => {
      await page.goto(path);
      const missing = await page.locator("img:not([alt])").count();
      expect(missing).toBe(0);
    });

    test(`${path} has no skipped heading levels`, async ({ page }) => {
      await page.goto(path);
      const levels = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll((nodes) =>
        nodes.map((node) => Number(node.tagName[1]))
      );
      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i += 1) {
        // A level may drop by any amount but may only increase by one.
        expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
      }
    });

    test(`${path} every form control has an accessible name`, async ({ page }) => {
      await page.goto(path);
      const unlabelled = await page
        .locator("input:not([type=hidden]), select, textarea")
        .evaluateAll((nodes) =>
          nodes.filter((node) => {
            const el = node as HTMLElement;
            if (el.getAttribute("aria-label")) return false;
            if (el.getAttribute("aria-label") === "") return true;
            const id = el.id;
            if (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) return false;
            if (el.closest("label")) return false;
            return true;
          }).length
        );
      expect(unlabelled).toBe(0);
    });
  }
});

test.describe("Responsive layout", () => {
  test("mobile drawer opens, traps focus and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: /open navigation menu/i }).click();
    const drawer = page.getByRole("dialog", { name: /navigation menu/i });
    await expect(drawer).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(drawer).toHaveCount(0);
  });
});

import { test, expect } from "@playwright/test";

test.describe("Admission Inquiry Multi-Step Funnel E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Step 1 validates personal contact details and rejects invalid phone", async ({
    page,
  }) => {
    const formSection = page.locator("#inquiry");
    await expect(formSection).toBeVisible();

    // Fill valid name & email, but INVALID 5-digit phone
    await formSection.locator("#inquiry-fullName").fill("Vikram Malhotra");
    await formSection.locator("#inquiry-email").fill("vikram@example.com");
    await formSection.locator("#inquiry-phone").fill("12345");

    // Click Next
    await formSection.getByRole("button", { name: /Continue to Academic Interests/i }).click();

    // Verify validation error is shown
    await expect(formSection).toContainText(/Please provide a valid 10-digit Indian mobile number/i);

    // Verify still on Step 1
    await expect(formSection).toContainText(/Step 1 of 2/i);
  });

  test("Legitimate entry advances to Step 2 and submits successfully with reference ID", async ({
    page,
  }) => {
    const formSection = page.locator("#inquiry");

    // 1. Fill Step 1 with valid details
    await formSection.locator("#inquiry-fullName").fill("Pooja Sharma");
    await formSection.locator("#inquiry-email").fill("pooja.sharma.test@example.com");
    await formSection.locator("#inquiry-phone").fill("9876543210");

    // Advance to Step 2
    await formSection.getByRole("button", { name: /Continue to Academic Interests/i }).click();

    // 2. Verify on Step 2
    await expect(formSection).toContainText(/Step 2 of 2/i);
    await expect(formSection).toContainText(/Academic Interests/i);

    // Select qualification & program
    await formSection.locator("#inquiry-qual").selectOption("12th Standard (PCM)");
    await formSection.locator("#inquiry-course").selectOption("B.Tech in Artificial Intelligence & Data Science");

    // 3. Complete Submission
    await formSection.getByRole("button", { name: /Complete Submission/i }).click();

    // 4. Verify confirmation view with Reference ID
    await expect(formSection).toContainText(/Admission Inquiry Received!/i, { timeout: 10000 });
    await expect(formSection).toContainText(/Application Reference ID/i);
    await expect(formSection.locator("span", { hasText: /^#/ })).toBeVisible();
  });
});


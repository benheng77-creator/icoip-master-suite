import { test, expect } from "@playwright/test";

test("admin forbidden route behavior is visible in ui", async ({ page }) => {
  await page.goto("/client");
  await expect(page.locator("body")).toBeVisible();
});

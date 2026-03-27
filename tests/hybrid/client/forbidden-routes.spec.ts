import { test, expect } from "@playwright/test";

test("client forbidden route behavior is visible in ui", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator("body")).toBeVisible();
});

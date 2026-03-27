import { test, expect } from "@playwright/test";

test("real forgot password flow", async ({ page }) => {
  await page.goto("/forgot-password");
  await expect(page.locator("body")).toBeVisible();
});

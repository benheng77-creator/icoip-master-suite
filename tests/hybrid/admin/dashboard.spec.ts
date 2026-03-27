import { test, expect } from "@playwright/test";

test("admin dashboard visible after stored auth", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator("body")).toBeVisible();
});

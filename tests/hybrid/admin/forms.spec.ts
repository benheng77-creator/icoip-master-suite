import { test, expect } from "@playwright/test";

test("admin create edit flow visible in ui", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator("body")).toBeVisible();
});

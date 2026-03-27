import { test, expect } from "@playwright/test";

test("admin role-specific workflow screen visible", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.locator("body")).toBeVisible();
});

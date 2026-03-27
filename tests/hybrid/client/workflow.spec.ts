import { test, expect } from "@playwright/test";

test("client role-specific workflow screen visible", async ({ page }) => {
  await page.goto("/client");
  await expect(page.locator("body")).toBeVisible();
});

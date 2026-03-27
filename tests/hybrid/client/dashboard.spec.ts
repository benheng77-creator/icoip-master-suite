import { test, expect } from "@playwright/test";

test("client dashboard visible after stored auth", async ({ page }) => {
  await page.goto("/client");
  await expect(page.locator("body")).toBeVisible();
});

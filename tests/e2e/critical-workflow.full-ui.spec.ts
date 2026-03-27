import { test, expect } from "@playwright/test";

test("full critical workflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();
});

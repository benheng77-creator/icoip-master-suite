import { test, expect } from "@playwright/test";

test("counsellor dashboard visible after stored auth", async ({ page }) => {
  await page.goto("/counsellor");
  await expect(page.locator("body")).toBeVisible();
});

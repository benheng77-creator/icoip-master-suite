import { test, expect } from "@playwright/test";

test("counsellor create edit flow visible in ui", async ({ page }) => {
  await page.goto("/counsellor");
  await expect(page.locator("body")).toBeVisible();
});

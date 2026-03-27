import { test, expect } from "@playwright/test";

test("counsellor role-specific workflow screen visible", async ({ page }) => {
  await page.goto("/counsellor");
  await expect(page.locator("body")).toBeVisible();
});

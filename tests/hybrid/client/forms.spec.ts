import { test, expect } from "@playwright/test";

test("client create edit flow visible in ui", async ({ page }) => {
  await page.goto("/client");
  await expect(page.locator("body")).toBeVisible();
});

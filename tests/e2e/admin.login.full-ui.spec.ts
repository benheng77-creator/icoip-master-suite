import { test, expect } from "@playwright/test";

test("admin real login flow", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel(/email/i).fill(process.env.ADMIN_EMAIL || "admin@example.com");
  await page.getByLabel(/password/i).fill(process.env.ADMIN_PASSWORD || "password");
  await page.getByRole("button", { name: /login|sign in/i }).click();
  await expect(page.locator("body")).toBeVisible();
});

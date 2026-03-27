import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000
  },
  projects: [
    {
      name: "api",
      testMatch: /tests\/api\/.*\.spec\.ts/
    },
    {
      name: "setup",
      testMatch: /tests\/setup\/.*\.(setup|spec)\.ts/
    },
    {
      name: "hybrid-admin",
      testMatch: /tests\/hybrid\/admin\/.*\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/admin.json"
      }
    },
    {
      name: "hybrid-counsellor",
      testMatch: /tests\/hybrid\/counsellor\/.*\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/counsellor.json"
      }
    },
    {
      name: "hybrid-client",
      testMatch: /tests\/hybrid\/client\/.*\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/client.json"
      }
    },
    {
      name: "e2e",
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ]
});

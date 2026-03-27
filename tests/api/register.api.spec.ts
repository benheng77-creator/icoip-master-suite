import { test, expect } from "@playwright/test";
import { newApiContext } from "../fixtures/api";

test("register api responds", async () => {
  const api = await newApiContext();
  const res = await api.post("/api/register", {
    data: {
      email: process.env.NEW_USER_EMAIL || "new-user@example.com",
      password: process.env.NEW_USER_PASSWORD || "password"
    }
  });
  expect([200, 201, 202, 204, 400, 409]).toContain(res.status());
  await api.dispose();
});

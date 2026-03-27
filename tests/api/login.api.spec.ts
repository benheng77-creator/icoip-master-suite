import { test, expect } from "@playwright/test";
import { newApiContext } from "../fixtures/api";

test("login api returns success", async () => {
  const api = await newApiContext();
  const res = await api.post("/api/login", {
    data: {
      email: process.env.CLIENT_EMAIL || "client@example.com",
      password: process.env.CLIENT_PASSWORD || "password"
    }
  });
  expect([200, 201, 204]).toContain(res.status());
  await api.dispose();
});

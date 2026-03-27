import { test, expect } from "@playwright/test";
import { newApiContext } from "../fixtures/api";

test("role endpoint responds", async () => {
  const api = await newApiContext();
  const res = await api.get("/api/me");
  expect([200, 401, 403]).toContain(res.status());
  await api.dispose();
});

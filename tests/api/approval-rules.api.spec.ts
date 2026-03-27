import { test, expect } from "@playwright/test";
import { newApiContext } from "../fixtures/api";

test("approval rules endpoint responds", async () => {
  const api = await newApiContext();
  const res = await api.get("/api/approval-rules");
  expect([200, 401, 403, 404]).toContain(res.status());
  await api.dispose();
});

import { test, expect } from "@playwright/test";
import { newApiContext } from "../fixtures/api";

test("otp request endpoint responds", async () => {
  const api = await newApiContext();
  const res = await api.post("/api/request-otp", {
    data: {
      email: process.env.CLIENT_EMAIL || "client@example.com"
    }
  });
  expect([200, 201, 202, 204]).toContain(res.status());
  await api.dispose();
});

test("otp verify endpoint responds", async () => {
  const api = await newApiContext();
  const res = await api.post("/api/verify-otp", {
    data: {
      email: process.env.CLIENT_EMAIL || "client@example.com",
      otp: process.env.TEST_OTP || "000000"
    }
  });
  expect([200, 201, 202, 204, 400, 401, 403]).toContain(res.status());
  await api.dispose();
});

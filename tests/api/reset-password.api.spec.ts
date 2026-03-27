import { test, expect } from "@playwright/test";
import { newApiContext } from "../fixtures/api";

test("reset password request endpoint responds", async () => {
  const api = await newApiContext();
  const res = await api.post("/api/reset-password/request", {
    data: {
      email: process.env.CLIENT_EMAIL || "client@example.com"
    }
  });
  expect([200, 201, 202, 204]).toContain(res.status());
  await api.dispose();
});

test("reset password complete endpoint responds", async () => {
  const api = await newApiContext();
  const res = await api.post("/api/reset-password/complete", {
    data: {
      email: process.env.CLIENT_EMAIL || "client@example.com",
      otp: process.env.TEST_OTP || "000000",
      password: process.env.NEW_PASSWORD || "password2"
    }
  });
  expect([200, 201, 202, 204, 400, 401, 403]).toContain(res.status());
  await api.dispose();
});

import type { APIRequestContext } from "@playwright/test";

type LoginArgs = {
  api: APIRequestContext;
  email: string;
  password: string;
};

export async function loginByApi({ api, email, password }: LoginArgs) {
  const res = await api.post("/api/login", {
    data: { email, password }
  });

  if (!res.ok()) {
    throw new Error(`API login failed: ${res.status()} ${await res.text()}`);
  }

  return res;
}

export async function requestOtp(api: APIRequestContext, email: string) {
  return api.post("/api/request-otp", { data: { email } });
}

export async function verifyOtp(api: APIRequestContext, email: string, otp: string) {
  return api.post("/api/verify-otp", { data: { email, otp } });
}

export async function requestPasswordReset(api: APIRequestContext, email: string) {
  return api.post("/api/reset-password/request", { data: { email } });
}

export async function completePasswordReset(api: APIRequestContext, email: string, otp: string, password: string) {
  return api.post("/api/reset-password/complete", { data: { email, otp, password } });
}

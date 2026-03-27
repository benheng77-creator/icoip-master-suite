import { test as setup, request } from "@playwright/test";
import path from "path";
import { loginByApi } from "../fixtures/auth";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:3000";

const adminFile = path.join(process.cwd(), "playwright/.auth/admin.json");
const counsellorFile = path.join(process.cwd(), "playwright/.auth/counsellor.json");
const clientFile = path.join(process.cwd(), "playwright/.auth/client.json");

setup("create admin auth state", async () => {
  const api = await request.newContext({ baseURL });
  await loginByApi({
    api,
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "password"
  });
  await api.storageState({ path: adminFile });
  await api.dispose();
});

setup("create counsellor auth state", async () => {
  const api = await request.newContext({ baseURL });
  await loginByApi({
    api,
    email: process.env.COUNSELLOR_EMAIL || "counsellor@example.com",
    password: process.env.COUNSELLOR_PASSWORD || "password"
  });
  await api.storageState({ path: counsellorFile });
  await api.dispose();
});

setup("create client auth state", async () => {
  const api = await request.newContext({ baseURL });
  await loginByApi({
    api,
    email: process.env.CLIENT_EMAIL || "client@example.com",
    password: process.env.CLIENT_PASSWORD || "password"
  });
  await api.storageState({ path: clientFile });
  await api.dispose();
});

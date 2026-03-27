import { request, type APIRequestContext } from "@playwright/test";

export async function newApiContext(baseURL?: string): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: baseURL || process.env.BASE_URL || "http://127.0.0.1:3000",
    extraHTTPHeaders: { "Accept": "application/json" }
  });
}

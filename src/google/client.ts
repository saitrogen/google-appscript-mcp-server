import { GoogleApiError } from "../errors/google_api_error.ts";
import type { GoogleOAuth } from "../auth/google_oauth.ts";
export interface GoogleRequestOptions { method?: "GET" | "POST" | "PUT" | "DELETE"; path: string; query?: Record<string, string | number | boolean | Array<string | number | boolean> | undefined>; body?: unknown; retries?: number; }
export class AppsScriptClient {
  constructor(private readonly oauth: GoogleOAuth) {}
  async request<T>(options: GoogleRequestOptions): Promise<T> {
    const url = new URL(`https://script.googleapis.com${options.path}`);
    for (const [key, value] of Object.entries(options.query ?? {})) { if (value === undefined) continue; if (Array.isArray(value)) for (const item of value) url.searchParams.append(key, String(item)); else url.searchParams.set(key, String(value)); }
    const retries = options.retries ?? 3; let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const token = await this.oauth.getAccessToken();
        const response = await fetch(url, { method: options.method ?? "GET", headers: { authorization: `Bearer ${token}`, accept: "application/json", ...(options.body !== undefined ? { "content-type": "application/json" } : {}) }, body: options.body !== undefined ? JSON.stringify(options.body) : undefined });
        if (response.ok) { if (response.status === 204) return {} as T; const text = await response.text(); return (text ? JSON.parse(text) : {}) as T; }
        const text = await response.text(); let payload: any = {}; try { payload = text ? JSON.parse(text) : {}; } catch { payload = { message: text }; }
        const error = new GoogleApiError(payload?.error?.message ?? payload?.message ?? response.statusText, response.status, payload?.error?.status ?? payload?.error?.code, payload?.error?.details);
        if ((response.status === 429 || response.status >= 500) && attempt < retries) { const retryAfter = Number(response.headers.get("retry-after") ?? "0"); await new Promise((r) => setTimeout(r, retryAfter > 0 ? retryAfter * 1000 : Math.min(4000, 250 * 2 ** attempt))); lastError = error; continue; }
        throw error;
      } catch (error) { lastError = error; if (error instanceof GoogleApiError || attempt >= retries) throw error; await new Promise((r) => setTimeout(r, Math.min(4000, 250 * 2 ** attempt))); }
    }
    throw lastError;
  }
}

import type { Config } from "../config.ts";
import type { TokenStore } from "./token_store.ts";
export const MANAGEMENT_SCOPES = [
  "https://www.googleapis.com/auth/script.projects",
  "https://www.googleapis.com/auth/script.deployments",
  "https://www.googleapis.com/auth/script.metrics",
  "https://www.googleapis.com/auth/script.processes",
] as const;
interface TokenResponse { access_token: string; expires_in: number; refresh_token?: string; scope?: string; token_type: string; }
export class GoogleOAuth {
  #accessToken?: { value: string; expiresAt: number };
  constructor(private readonly config: Config, private readonly store: TokenStore) {}
  async createAuthorizationUrl(): Promise<string> {
    const state = crypto.randomUUID(); await this.store.putOAuthState(state, Date.now() + 600000);
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", this.config.googleClientId); url.searchParams.set("redirect_uri", this.config.googleRedirectUri);
    url.searchParams.set("response_type", "code"); url.searchParams.set("access_type", "offline"); url.searchParams.set("prompt", "consent");
    url.searchParams.set("include_granted_scopes", "true"); url.searchParams.set("scope", [...MANAGEMENT_SCOPES, ...this.config.googleExtraScopes].join(" ")); url.searchParams.set("state", state);
    return url.toString();
  }
  async handleCallback(code: string, state: string): Promise<void> {
    if (!(await this.store.consumeOAuthState(state))) throw new Error("Invalid or expired OAuth state");
    const body = new URLSearchParams({ code, client_id: this.config.googleClientId, client_secret: this.config.googleClientSecret, redirect_uri: this.config.googleRedirectUri, grant_type: "authorization_code" });
    const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body });
    const data = await res.json() as TokenResponse & { error?: string; error_description?: string };
    if (!res.ok || !data.access_token) throw new Error(data.error_description || data.error || "Google token exchange failed");
    if (data.refresh_token) await this.store.setRefreshToken(data.refresh_token);
    this.#accessToken = { value: data.access_token, expiresAt: Date.now() + Math.max(0, data.expires_in - 60) * 1000 };
  }
  async getAccessToken(): Promise<string> {
    if (this.#accessToken && this.#accessToken.expiresAt > Date.now()) return this.#accessToken.value;
    let refreshToken = await this.store.getRefreshToken();
    if (!refreshToken && this.config.bootstrapRefreshToken) { refreshToken = this.config.bootstrapRefreshToken; await this.store.setRefreshToken(refreshToken); }
    if (!refreshToken) throw new Error("Google account is not linked. Visit /auth/google/start first.");
    const body = new URLSearchParams({ client_id: this.config.googleClientId, client_secret: this.config.googleClientSecret, refresh_token: refreshToken, grant_type: "refresh_token" });
    const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body });
    const data = await res.json() as TokenResponse & { error?: string; error_description?: string };
    if (!res.ok || !data.access_token) { if (data.error === "invalid_grant") await this.store.deleteRefreshToken(); throw new Error(data.error_description || data.error || "Google access-token refresh failed"); }
    this.#accessToken = { value: data.access_token, expiresAt: Date.now() + Math.max(0, data.expires_in - 60) * 1000 }; return data.access_token;
  }
}

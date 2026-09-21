import { createMcpHandler } from "@modelcontextprotocol/server";
import { loadConfig } from "./config.ts";
import { KvTokenStore } from "./auth/token_store.ts";
import { GoogleOAuth } from "./auth/google_oauth.ts";
import { authorizeMcpRequest } from "./auth/mcp_auth.ts";
import { AppsScriptClient } from "./google/client.ts";
import { createAppsScriptMcpServer } from "./server/create_server.ts";
import { TOOL_INVENTORY } from "./server/tool_inventory.ts";

const config = loadConfig();
const kv = await Deno.openKv(config.kvPath);
const tokenStore = new KvTokenStore(kv, config.tokenEncryptionKeyBase64);
const googleOAuth = new GoogleOAuth(config, tokenStore);
const googleClient = new AppsScriptClient(googleOAuth);
const mcpHandler = createMcpHandler(() => createAppsScriptMcpServer(googleClient));

function json(value: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json; charset=utf-8", ...headers } });
}

Deno.serve({ port: config.port }, async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/healthz") return json({ ok: true, service: "google-apps-script-mcp" });
  if (url.pathname === "/tool-inventory" && req.method === "GET") return json({ tools: TOOL_INVENTORY });

  if (url.pathname === "/auth/google/start" && req.method === "GET") {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${config.adminSetupToken}`) {
      return json({ ok: false, error: "unauthorized_setup" }, 401, { "www-authenticate": "Bearer" });
    }
    const target = await googleOAuth.createAuthorizationUrl();
    return json({ ok: true, authorizationUrl: target });
  }
  if (url.pathname === "/auth/google/callback" && req.method === "GET") {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    if (error) return json({ ok: false, error }, 400);
    if (!code || !state) return json({ ok: false, error: "missing code or state" }, 400);
    try {
      await googleOAuth.handleCallback(code, state);
      return new Response("Google Apps Script account linked. You may close this tab.", { headers: { "content-type": "text/plain; charset=utf-8" } });
    } catch (e) {
      return json({ ok: false, error: e instanceof Error ? e.message : String(e) }, 400);
    }
  }

  if (url.pathname === "/mcp") {
    const denied = authorizeMcpRequest(req, config);
    if (denied) return denied;
    return mcpHandler.fetch(req);
  }

  return json({ ok: false, error: "not_found" }, 404);
});

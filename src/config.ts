export type McpAuthMode = "none" | "bearer";

export interface Config {
  baseUrl: string;
  port: number;
  mcpAuthMode: McpAuthMode;
  mcpBearerToken?: string;
  googleClientId: string;
  googleClientSecret: string;
  googleRedirectUri: string;
  tokenEncryptionKeyBase64: string;
  bootstrapRefreshToken?: string;
  adminSetupToken: string;
  googleExtraScopes: string[];
  kvPath?: string;
}

function required(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function loadConfig(): Config {
  const baseUrl = required("BASE_URL").replace(/\/$/, "");
  const auth = (Deno.env.get("MCP_AUTH_MODE") ?? "none") as McpAuthMode;
  if (auth !== "none" && auth !== "bearer") throw new Error("MCP_AUTH_MODE must be none or bearer");
  const bearer = Deno.env.get("MCP_BEARER_TOKEN")?.trim() || undefined;
  if (auth === "bearer" && !bearer) throw new Error("MCP_BEARER_TOKEN is required in bearer mode");
  return {
    baseUrl,
    port: Number(Deno.env.get("PORT") ?? "8000"),
    mcpAuthMode: auth,
    mcpBearerToken: bearer,
    googleClientId: required("GOOGLE_CLIENT_ID"),
    googleClientSecret: required("GOOGLE_CLIENT_SECRET"),
    googleRedirectUri: Deno.env.get("GOOGLE_REDIRECT_URI")?.trim() || `${baseUrl}/auth/google/callback`,
    tokenEncryptionKeyBase64: required("TOKEN_ENCRYPTION_KEY_BASE64"),
    bootstrapRefreshToken: Deno.env.get("GOOGLE_REFRESH_TOKEN")?.trim() || undefined,
    adminSetupToken: required("ADMIN_SETUP_TOKEN"),
    googleExtraScopes: (Deno.env.get("GOOGLE_EXTRA_SCOPES") ?? "").split(/[ ,]+/).map((s) => s.trim()).filter(Boolean),
    kvPath: Deno.env.get("DENO_KV_PATH")?.trim() || undefined,
  };
}

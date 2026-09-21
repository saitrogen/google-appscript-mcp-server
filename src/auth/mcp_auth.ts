import type { Config } from "../config.ts";
function timingSafeEqualString(a: string, b: string): boolean {
  const aa = new TextEncoder().encode(a), bb = new TextEncoder().encode(b);
  if (aa.length !== bb.length) return false;
  let diff = 0; for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}
export function authorizeMcpRequest(req: Request, config: Config): Response | null {
  if (config.mcpAuthMode === "none") return null;
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!config.mcpBearerToken || !timingSafeEqualString(token, config.mcpBearerToken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { "content-type": "application/json", "www-authenticate": "Bearer" } });
  }
  return null;
}

# Deployment assessment

Deno Deploy is technically compatible with the code (Deno.serve, fetch, Web Crypto, npm imports, Deno KV) only when the chosen environment supplies durable KV and secrets. OAuth refresh-token persistence is the decisive constraint.

Recommended first architecture: self-hosted Deno or Docker + persistent KV volume + encrypted Google refresh token + Secure MCP Tunnel/private ingress. Docker persists KV under /data. Public deployment should wait for OAuth 2.1 MCP authorization.

Deno Deploy is viable later if durable KV and secret handling are confirmed for the selected plan; do not choose it merely because the syntax runs there.

# Google Apps Script MCP for ChatGPT

Deno + TypeScript remote MCP server for safely managing Google Apps Script from ChatGPT. This branch modernizes the upstream `mohalmah/google-appscript-mcp-server` for Streamable HTTP, remote OAuth persistence, structured tools, safe source edits, tests, and current ChatGPT plugin packaging.

## Architecture
`ChatGPT → remote /mcp → Apps Script API → user's Apps Script projects`.

Runtime: Deno, TypeScript, native fetch/Web Crypto, MCP SDK v2, Deno KV. The server exposes 16 native Apps Script API capabilities plus four safe file convenience tools.

It does **not** directly edit spreadsheet cells. Spreadsheet access occurs only when Apps Script code executes services such as `SpreadsheetApp`.

## Local/private start
Configure `.env.example`, run `deno task start`, link Google through the protected `/auth/google/start` flow, and point the MCP client at `/mcp`. Never expose `MCP_AUTH_MODE=none` publicly; use it only behind a trusted tunnel/private boundary.

## Verification
`deno task check && deno task test && deno task fmt --check && deno task lint`.

Tests are mocked/unit tests. Live Google integration, remote deployment, and ChatGPT connection are not claimed until manually completed.

See `docs/AUDIT.md`, `TOOL_REFERENCE.md`, `GOOGLE_OAUTH_SETUP.md`, `CHATGPT_SETUP.md`, `DEPLOYMENT.md`, `SECURITY.md`, and `BLOCKERS.md`.

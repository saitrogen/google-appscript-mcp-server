# Upstream audit

The upstream Node ESM server uses MCP SDK 1.x, STDIO as the primary transport and legacy SSE via Express. OAuth is local-machine oriented: localhost callback server, browser auto-open, Node networking, environment credentials, and local token persistence.

Concrete defects found: weak/inconsistent tool naming and schemas; full arguments/results logged; `projects.updateContent` exposed without strong full-replacement safeguards; metrics asks callers for raw API/OAuth tokens; `listScriptProcesses` hard-codes an empty access token; ad-hoc debug scripts rather than deterministic unit tests; and README execution guidance understates `scripts.run` API-executable/Cloud-project/scope requirements.

Migration: Deno + TypeScript, Streamable HTTP `/mcp`, centralized OAuth/API client, encrypted durable refresh-token storage, structured MCP results, READ/WRITE/EXECUTE/DESTRUCTIVE annotations, safe file helpers, corrected deployment update wrapper, pagination/retry handling, CI/tests, and Skills.

Not claimed: live Google API test, deployment, or ChatGPT registration.

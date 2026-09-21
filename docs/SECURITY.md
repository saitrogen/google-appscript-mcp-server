# Security

Never commit OAuth client secrets, refresh/access tokens, encryption keys, setup tokens, or MCP bearer tokens. Refresh tokens are AES-GCM encrypted at rest.

Project source is sensitive: do not log tool arguments/results by default. `projects.updateContent` is full replacement, so the native tool is DESTRUCTIVE and explicitly confirmed; prefer safe file helpers. Deployment/file deletion is DESTRUCTIVE. `execution.run` is EXECUTE and can invoke code that accesses Sheets, Drive, Gmail or external systems under granted scopes.

MCP_AUTH_MODE=none is private-tunnel only. Static bearer is development/private use, not public publication. Protect Google linking with ADMIN_SETUP_TOKEN. Apply host-level rate limits for public ingress. Multi-user expansion requires token isolation by authenticated subject.

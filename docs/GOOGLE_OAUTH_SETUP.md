# Google OAuth setup

1. Create/select a standard Google Cloud project and enable Google Apps Script API.
2. Configure Google Auth Platform/OAuth consent.
3. Create a **Web application** OAuth client.
4. Add the exact deployed callback URI: `https://HOST/auth/google/callback`.
5. Store client ID/secret, a random 32-byte base64 encryption key, and a long ADMIN_SETUP_TOKEN as host secrets.
6. Enable Apps Script API project-management access in the user's Apps Script settings/dashboard.
7. Call `GET /auth/google/start` with `Authorization: Bearer $ADMIN_SETUP_TOKEN`, then open the returned authorization URL.

Refresh tokens are AES-GCM encrypted in Deno KV. An external consent screen left in Testing generally produces short-lived (about seven-day) refresh-token behavior for non-basic scopes; publish/verify as appropriate for durable use.

For `scripts.run`, add only the target script's required scopes through GOOGLE_EXTRA_SCOPES and reauthorize. Public/multi-user distribution may require Google verification and per-user token isolation.

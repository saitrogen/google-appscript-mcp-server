# Blockers

| Blocker | Severity | Code solves? | Manual? | Notes |
|---|---|---:|---:|---|
| Google OAuth web client | Required | No | Yes | Create in Google Cloud |
| Apps Script API enablement | Required | No | Yes | Cloud console |
| Apps Script API management toggle | Required for writes | No | Yes | Apps Script settings |
| Exact redirect URI | Required | Partly | Yes | Must match deployment |
| Google user authorization | Required | No | Yes | Browser consent |
| OAuth app left in Testing | High | No | Yes | Refresh-token lifetime issue |
| scripts.run API executable | Conditional | Partly | Yes | Target deployment required |
| scripts.run Cloud-project requirement | Conditional | No | Yes | Shared standard Cloud project requirements |
| Target-script OAuth scopes | Conditional | Partly | Yes | Configure/re-authorize |
| Service account for scripts.run | Hard limitation | No | N/A | Execution API does not support it |
| ChatGPT MCP registration | Required | No | Yes | Register /mcp |
| plugin_asdk_app connection ID | Required for .app.json | No | Yes | Created after registration |
| Public MCP OAuth 2.1 | Required for public auth | Yes | Maybe | Not implemented in private-first branch |
| Google OAuth verification | Conditional | No | Possibly | Audience/scopes dependent |
| Durable token storage | Required | Yes | Host config | Persist Deno KV |
| Live Google test | Pending | No | Yes | Needs credentials |
| Live ChatGPT test | Pending | No | Yes | Needs deployed/tunneled endpoint |

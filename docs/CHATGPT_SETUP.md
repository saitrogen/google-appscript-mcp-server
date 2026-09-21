# ChatGPT setup

Current OpenAI plugins can package Skills plus a remote MCP server; old ai-plugin.json conventions are not used here.

Private path:
1. Deploy/run the Deno server or expose it with OpenAI Secure MCP Tunnel.
2. Enable ChatGPT developer mode and register the Streamable HTTP endpoint `https://HOST/mcp`.
3. Verify initialization, tools/list, then a read-only tool.
4. ChatGPT creates a technical connection ID such as `plugin_asdk_app...`.
5. Only then create `.app.json` pointing at that connection and add `"apps": "./.app.json"` to plugin.json.

The repository intentionally does not fabricate `.app.json` before that ID exists.

For a public authenticated MCP, implement OpenAI/MCP OAuth 2.1 resource-server requirements (protected-resource metadata, PKCE S256, authorization-server discovery, token validation, and proper WWW-Authenticate challenges). Static bearer/private-none mode is not the public publishing architecture.

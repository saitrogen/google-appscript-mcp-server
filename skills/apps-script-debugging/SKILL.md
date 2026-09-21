---
name: apps-script-debugging
description: Debug Google Apps Script projects using source inspection, process history, execution responses, and metrics for failed functions and deployment/runtime errors.
---
# Apps Script Debugging
Start with evidence. Inspect source/manifest. Use processes.list_script_processes for project history and processes.list for user-wide activity. Filter by time/function/deployment/status when known. Use metrics for aggregate trends, not line logs. Use execution.run only when an API executable exists and invocation is safe. Distinguish scripts.run operation errors from MCP/HTTP auth failures. The Apps Script API does not expose every console log line.

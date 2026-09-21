---
name: apps-script-editing
description: Safely inspect and edit Google Apps Script projects through Apps Script MCP tools. Use for .gs, .html, and appsscript.json changes where unaffected files must be preserved.
---
# Apps Script Editing
Always read before writing. Google projects.updateContent replaces complete project content; it is not patch-based.
1. Read metadata/content first.
2. Understand SERVER_JS, HTML, and appsscript JSON roles.
3. Prefer apps_script.files.update/create/delete for one-file changes; they preserve and verify other files.
4. Use projects.update_content only for intentional full replacement, with every file and manifest.
5. Read back and verify after writes.
6. Do not version/deploy unless requested.
Never reconstruct a full project from partial context or omit appsscript.

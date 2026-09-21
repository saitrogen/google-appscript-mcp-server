---
name: apps-script-deployment
description: Safely version and deploy Google Apps Script projects, including immutable versions, deployment creation/update, web apps, and API executable releases.
---
# Apps Script Deployment
Inspect source and deployments, edit and verify source, then create a version only when a stable snapshot is appropriate. Create/update deployments only when explicitly requested. Never delete deployments as cleanup without explicit intent.
For scripts.run, require an API executable deployment, Google's standard Cloud-project requirements, Apps Script API enablement, and every OAuth scope used by the target script.

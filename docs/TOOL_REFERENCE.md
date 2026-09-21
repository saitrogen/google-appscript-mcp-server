# Tool reference

| MCP tool | Effect | Google operation |
|---|---|---|
| apps_script.projects.create | WRITE | POST /v1/projects — projects.create |
| apps_script.projects.get | READ | GET /v1/projects/{scriptId} — projects.get |
| apps_script.projects.get_content | READ | GET /v1/projects/{scriptId}/content — projects.getContent |
| apps_script.projects.update_content | DESTRUCTIVE | PUT /v1/projects/{scriptId}/content — projects.updateContent (full replacement) |
| apps_script.files.get | READ | convenience over projects.getContent |
| apps_script.files.update/create/delete | WRITE/DESTRUCTIVE | getContent → updateContent → getContent verification |
| apps_script.versions.create/get/list | WRITE/READ | projects.versions.create/get/list |
| apps_script.deployments.create/get/list/update/delete | WRITE/READ/DESTRUCTIVE | projects.deployments.* |
| apps_script.execution.run | EXECUTE | POST /v1/scripts/{scriptId}:run — scripts.run |
| apps_script.processes.list | READ | GET /v1/processes — processes.list |
| apps_script.processes.list_script_processes | READ | GET /v1/processes:listScriptProcesses |
| apps_script.metrics.get | READ | GET /v1/projects/{scriptId}/metrics — projects.getMetrics |

Management OAuth scopes: script.projects, script.deployments, script.processes, script.metrics. `scripts.run` additionally needs every scope used by the target script.

---
name: apps-script-architecture
description: Apply maintainable Google Apps Script architecture when reviewing or implementing service layers, HTMLService interfaces, SpreadsheetApp persistence, PropertiesService, LockService, CacheService, and triggers.
---
# Apps Script Architecture
Respect existing architecture. Keep spreadsheet/external mutations in backend services; keep interface wrappers thin and HTMLService focused on UI and google.script.run calls. Treat spreadsheet schemas as contracts. Use PropertiesService for small configuration, LockService for concurrent ID/append races, CacheService only for reconstructable data, and document trigger authorization/event shapes. Preserve public function contracts used by UI and triggers.

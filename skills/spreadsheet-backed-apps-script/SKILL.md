---
name: spreadsheet-backed-apps-script
description: Safely modify Apps Script projects that use Google Sheets as a datastore, including schemas, IDs, operational records, billing/history tables, and header-driven structures.
---
# Spreadsheet-backed Apps Script
Distinguish code changes from data changes. Inspect sheet names, headers, validation, and mappings before changing persistence logic. Preserve schemas unless migration is explicit. Prefer header maps/stable IDs where established. Preserve historical rows; use LockService for concurrent IDs/appends. Keep business rules in backend modules. Identify snapshot vs dynamic calculations before changing historical/billing behavior. The Apps Script project API edits source, not spreadsheet cells.

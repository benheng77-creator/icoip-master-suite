---
name: log-triage
description: Read large logs in isolated context and return only the actionable error summary.
context: fork
---

Rules:
- return only the top error chain
- max 12 lines
- include root cause, first bad file, first bad line if available, exact next fix
- never paste full logs

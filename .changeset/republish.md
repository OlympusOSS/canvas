---
"@olympusoss/canvas": patch
---

Republish via CI after the previous Release run failed at the publish step due to a token-permission misconfiguration. No library changes — `package.json` already drifted to `2.6.20` (the previous run version-bumped before failing); this changeset bumps to `2.6.21` and ships through the corrected pipeline.

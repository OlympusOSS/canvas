---
"@olympusoss/canvas": patch
---

Republish via CI on a fresh changeset after granting the npm org write access to the package and regenerating the publish token. Heals version drift between `package.json` (currently `2.6.21`) and the npm registry (currently `2.6.19`) by shipping `2.6.22` through the corrected pipeline.

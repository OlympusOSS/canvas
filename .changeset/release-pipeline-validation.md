---
"@olympusoss/canvas": patch
---

Internal: validate the workflow_run-gated release pipeline by republishing through CI. No library API or behavior changes. Earlier patch (`2.6.19`) was published manually from a local terminal because the prior pipeline raced CI against Release in parallel; this version lands via the new CI-success-gated chain.

---
"@olympusoss/canvas": patch
---

Tweak: `ServiceHealthList` healthy-status dots now pulse and glow.

- Healthy rows render an `animate-ping` ring around the dot plus a soft drop-shadow halo (in addition to the existing 3px outline). Degraded / down dots stay static so the pulse is reserved for the "everything's alive" signal.
- Docs `all-healthy` example: the in-card label is now "All systems nominal" (heading text only — no extra dot beside it; the per-service pulse carries the signal).

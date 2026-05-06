---
"@olympusoss/canvas": patch
---

Docs: `WorldHeatMap` props reference fleshed out.

- DEFAULT column now populates for every prop (`"100%"`, `[20, 0]`, `3`, `"auto"`, `false`, `"hsl(var(--chart-1))"`, `[4, 20]`, `true`) — previously empty because the source's JSDoc embedded defaults inline in the description text rather than as `@default` tags.
- `points` description spells out the `{ lat, lng, label, count }` shape inline so consumers don't have to chase the `WorldHeatMapPoint` type.
- Behaviour hints expanded (e.g. `zoom` calls out `0` = whole world / `3` = continent / `5–7` = country; `markerRadiusRange` notes the log-scale).

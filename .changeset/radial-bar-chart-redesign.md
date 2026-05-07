---
"@olympusoss/canvas": patch
---

Docs: `RadialBarChart` default example redesigned to match SunburstChart visual quality (Phase 1 of the 14-chart redesign).

- Each of the 5 rings now paints a distinct chart-N hue (`chart-1`→`chart-5`) via explicit `<ChartCell>` children of `<RadialBar>`. Previously every ring rendered the same Recharts default colour rotated by index, so the five days read as a single hue family.
- Adds `cornerRadius={6}` for the polished rounded-end look matching the Sunburst inner ring.
- Keeps the existing `background` track, `innerRadius`/`outerRadius`/`barSize` layout, and 12-o'clock-clockwise sweep.

---
"@olympusoss/canvas": patch
---

Docs:

- `AreaChart` default example: brings `<XAxis>` and `<YAxis>` back with text/number labels (axis lines + tick lines hidden, ticks rendered in `--muted-foreground`). Keeps the `--chart-1` gradient fill from the previous pass — now the chart has both readable scales and a visible area.
- `ActivityHeatmap` default example: adds row labels (`D-N` Y-axis), sparse hour-tick X-axis (`0h`, `6h`, `12h`, `18h`, `23h`), a "Fewer ↔ More" gradient legend, taller cells (`cellHeight: 16`), and switches the cell hue to the more vibrant `chart-2`. Previously it was just a wash of cells with no axis context.

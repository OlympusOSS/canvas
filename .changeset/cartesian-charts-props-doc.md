---
"@olympusoss/canvas": patch
---

Docs: Full prop references for `BarChart` (26 props), `ComposedChart` (26 props), and `AreaChart` (22 props). All three were Recharts `CategoricalChart` passthroughs in `chart-types`, so react-docgen returned empty prop lists.

Each entry covers the same shape: required `data` + `children` (with chart-specific child guidance — `<Bar>` + `stackId` for stacked bars, mixed `<Bar>`/`<Line>`/`<Area>`/`<Scatter>` for ComposedChart, `<defs><linearGradient>` for theme-aware AreaChart fills), layout (`margin`, `layout`, `stackOffset`, `reverseStackOrder`), Bar-only props (`barCategoryGap`, `barGap`, `barSize`, `maxBarSize`) on BarChart and ComposedChart, sync (`syncId`, `syncMethod`), `throttleDelay`, `defaultShowTooltip`, the full chart-level pointer-event surface (`onClick`, `onMouseEnter`/`Leave`/`Move`/`Down`/`Up`, `onDoubleClick`, `onContextMenu`), and root wrapper props (`width`, `height`, `className`, `style`).

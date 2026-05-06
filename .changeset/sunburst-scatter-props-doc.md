---
"@olympusoss/canvas": patch
---

Docs: Full prop references for `SunburstChart`, `ScatterChart`, and `Sankey`. All three were passthroughs of Recharts primitives, so react-docgen returned empty prop lists and the pages rendered the "no documented props" fallback.

- `SunburstChart` (19 props): `data`, `dataKey`, `padding`, `ringPadding`, `innerRadius`, `outerRadius`, `cx`, `cy`, `startAngle`, `endAngle`, `fill`, `stroke`, `textOptions`, `onClick`, `onMouseEnter`, `onMouseLeave`, `width`, `height`, `children`. Notes call out the `startAngle`/`endAngle` half-circle pattern and the `letterSpacing` cast inside `textOptions`.
- `ScatterChart` (19 props): `children`, `data`, `margin`, `layout`, `syncId`, `syncMethod`, `throttleDelay`, `defaultShowTooltip`, `width`, `height`, `style`, plus the chart-level pointer events. Notes clarify that scatter data lives on each `<Scatter>` child rather than on the chart wrapper.
- `Sankey` (17 props): `data`, `nameKey`, `dataKey`, `nodePadding`, `nodeWidth`, `linkCurvature`, `iterations`, `node`, `link`, `sort`, `margin`, `onClick`, `onMouseEnter`, `onMouseLeave`, `width`, `height`, `children`. Includes the `(element, type, event)` event callback shape and the `node`/`link` styling vs custom-renderer dual API.

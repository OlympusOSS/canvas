---
"@olympusoss/canvas": patch
---

Docs: `Treemap` props page goes from "Treemap takes no documented props beyond the standard HTML attributes" to a full 18-row reference. Because canvas re-exports `RechartsPrimitive.Treemap` directly, react-docgen returned an empty prop list — added explicit entries via `EXTRA_PROPS["charts/chart-types"].Treemap` covering data shape (`data`, `dataKey`, `nameKey`, `type`, `aspectRatio`), styling (`fill`, `stroke`, `content`), animation (`isAnimationActive`, `animationBegin`, `animationDuration`, `animationEasing`, `onAnimationStart`, `onAnimationEnd`), interaction (`onClick`, `onMouseEnter`, `onMouseLeave`), and `children`.

---
"@olympusoss/canvas": patch
---

**Fix**: `DashboardGrid` now measures parent width correctly in iframes, modals, and any other container that resizes independently of the window.

Previously DashboardGrid wrapped `react-grid-layout` with the upstream `WidthProvider` HOC, which defaults its initial width to 1280px and updates only on `window.resize` events. In iframes (e.g. the canvas docs preview) that resize event never fires from the parent context, so the grid stayed at the 1280px default forever — items overflowed any narrower container by 240px and got clipped.

Replaced with a `ResizeObserver` that observes the grid's own wrapper, plus a synchronous `useLayoutEffect` initial measurement so the first paint already has the correct width in real browsers. SSR / jsdom fall back to a 1024px default.

**Change**: default vertical margin reduced from `16px` to `8px` (default `margin` prop is now `[16, 8]` instead of `[16, 16]`). Tighter row gaps match the visual density most dashboards want; consumers who liked the looser spacing can pass `margin={[16, 16]}` explicitly.

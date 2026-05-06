---
"@olympusoss/canvas": patch
---

Docs: Fix the component manifest so each entry sits in its tier and tiers are alphabetical.

- `Sparkline` was filed under molecules (with `tier: "charts"`) — it now sits in the charts section, alphabetised between `ServiceHealthList` and `StackedBar`. The Charts tier index now lists 19 components in clean alphabetical order.
- `BrandMark` (atoms) moved up between `Badge` and `Button`.
- Organisms `Toaster` (id: `sonner`, label `Toaster`) moved to the end of the tier so it sorts after `Tabs` and `ThemeProvider` by label.

No component code or routes changed — manifest order only.

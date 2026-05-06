---
"@olympusoss/canvas": patch
---

Fix: `Resizable` (vertical orientation + sizing) was broken after the `react-resizable-panels` v4 upgrade. Two unrelated regressions stacked under "Top/Bottom doesn't work":

1. **Wrong CSS attribute selector.** The wrapper styled vertical layouts off `data-[panel-group-direction=vertical]` — that attribute existed in v3 but was removed in v4. v4 only emits `aria-orientation` (and only on `Separator`). Group flex direction is now decided in JS from the `orientation` prop; separator dimension styles now key off `aria-[orientation=horizontal]` (separator inside a vertical group).

2. **`className` height was ignored.** v4 forces inline `height: 100%; width: 100%` on the panel group, which overrides any `className="h-32"` consumers passed directly to `<ResizablePanelGroup>`. Now the group is wrapped internally in a sizing div — `className` lands on the wrapper, the library's `Group` fills 100%. Existing usage compiles unchanged.

Bonus: docs `orientations` and `nested-panels` examples bumped to `h-48` / `h-64` so consumers can see the panels actually drag.

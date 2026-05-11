---
"@olympusoss/canvas": minor
---

**`NavBar` sticky behavior** — when `sticky=true` (default), the bar now uses `position: sticky` + `top: 0` instead of `position: fixed`. Content scrolls underneath through a translucent `bg-background/80 backdrop-blur` for a frosted-glass effect that matches the canvas hand-off. The previous `<div className="h-14" />` spacer is gone (sticky doesn't need it).

Default opacity changes from `bg-background/95` to `bg-background/80` so the page beneath reads through clearly. The `supports-[backdrop-filter]:bg-background/60` progressive fallback is dropped — browsers without `backdrop-filter` see the `/80` background, which is still legible.

No props changed — consumers that pass `sticky={true|false}` keep working. Visual position at rest is identical; on scroll the bar now frosts hero/feature content reading through it.

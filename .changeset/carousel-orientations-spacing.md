---
"@olympusoss/canvas": patch
---

Docs: Fix the side-by-side carousel orientations example.

- Wrapper gap: `gap-12` → `gap-20` (was 48px, now 80px). The horizontal carousel's `CarouselNext` button overhangs `-right-12` (48px), so `gap-12` left exactly 0px clearance — making the buttons appear to touch the vertical carousel.
- Vertical carousel width: `w-32` → `w-48` (128px → 192px) so the card no longer feels cramped next to the 256px horizontal one.
- Vertical `CarouselContent` height: `h-24` → `h-28` (96px → 112px). The carousel's inner flex container uses `-mt-4` to compensate for slides' `pt-4`, which made the viewport auto-fit at `inner_h - 16`. With a 96px card and `h-24` (96px) on the content, the viewport ended up at 80px and clipped the card's bottom 16px. `h-28` ensures the viewport renders at 96px, fully showing the card.

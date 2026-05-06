---
"@olympusoss/canvas": patch
---

Docs: Fix the side-by-side carousel orientations example so the horizontal carousel's right `→` button has clear breathing room from the vertical carousel.

- Wrapper gap: `gap-12` → `gap-20` (was 48px, now 80px). The horizontal carousel's `CarouselNext` button overhangs `-right-12` (48px), so `gap-12` left exactly 0px clearance — making the buttons appear to touch the vertical carousel.
- Vertical carousel width: `w-32` → `w-48` (128px → 192px) so the card no longer feels cramped next to the 256px horizontal one.

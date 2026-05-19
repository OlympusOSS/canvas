---
"@olympusoss/canvas": minor
---

feat(tokens): make vivid blue the default `--primary` and `--ring`

Adopts the handoff prototype's rendered accent colour as the Canvas
default. The handoff prototype runs a runtime theme picker that
injects an inline `style="--primary: 240 79% 60%; --ring: 240 79% 60%"`
on the `<html>` root, so every consumer of the prototype sees a vivid
blue accent even though the canonical `colors_and_type.css` declares
`--primary: 240 5.9% 10%` (dark zinc). Baking the blue into Canvas
means consumers pick it up without re-implementing the picker.

Light mode:
  --primary: 240 79% 60%       (was 240 5.9% 10%)
  --primary-foreground: 0 0% 100%   (was 0 0% 98%)
  --ring: 240 79% 60%               (was 240 5.9% 10%)

Dark mode:
  --primary: 240 79% 60%            (was 0 0% 98%)
  --primary-foreground: 0 0% 100%   (was 240 5.9% 10%)
  --ring: 240 79% 60%               (was 240 4.9% 83.9%)

Everything else stays on the canonical shadcn zinc neutral palette.

Visible impact: primary `<Button>`s, focus rings, the Sign-ins chart
bars in Athena's dashboard, and any other surface that reads from
`hsl(var(--primary))` will now render as vivid blue instead of dark
zinc / near-white. Components that need the prior neutral can read
`hsl(var(--foreground))` or `hsl(var(--secondary))`.

---
"@olympusoss/canvas": minor
---

feat(tokens): align light + dark base palette and sidebar with the Athena design handoff

The light-mode sidebar palette and the entire dark-mode base palette now mirror the Athena design handoff (`~/Downloads/athena/colors_and_type.css`) verbatim. Canvas's previous customisations are removed in favour of the shadcn neutral defaults the handoff specifies:

- **Light mode** drops the blue-tinted sidebar (hue 230) for the handoff's neutral shadcn zinc (`--sidebar-background: 0 0% 98%`, foreground / accent / accent-foreground / border / primary all at hue 240 or 220). `--destructive` also moves from `4 78% 50%` to the handoff's `0 84.2% 60.2%`.

- **Dark mode** drops the "tiered elevation" design (hue 225 with lightness stepping across body / sidebar / card / accent surfaces) for the handoff's flat shadcn neutrals (hue 240). Body, card, popover all share the same lightness inside dark mode; the visible separation now comes from `--border` rather than tonal lift.

- Both the raw HSL triplets (consumed by `hsl(var(--…))` in component CSS) and the resolved `hsl()` forms in the dual-form sidebar block (consumed by Tailwind v4's `@theme inline` mapping) are kept in sync.

Preserved as Canvas extensions: `--chart-1` through `--chart-6`, `--stat-*`, `--tracking-*`, `--brand`, `--brand-foreground`, scrollbar styling. The handoff dashboard renders chart bars with `hsl(var(--primary))`, not `--chart-1`, so the chart palette divergence has no visible effect in the prototype.

Consumers carrying `:root` / `:root:root` overrides for these tokens (Athena does) should drop the overrides after bumping to this version. Consumers that render in dark mode (Hera) will see a flatter look; visually verify after bumping.

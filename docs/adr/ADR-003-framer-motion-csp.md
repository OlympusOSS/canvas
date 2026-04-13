# ADR-003: Framer-Motion CSP Compatibility Assessment

**Status:** Accepted
**Date:** 2026-04-13
**Context:** canvas#46 (assessment requirement AC6)

## Assessment

Framer-motion v12 injects inline `transform` and `opacity` style attributes at runtime via its animation engine. There is no configuration option to avoid this behavior.

### Can framer-motion be configured to avoid inline style injection?

**No.** Framer-motion's animation engine fundamentally relies on setting `style.transform` and `style.opacity` directly on DOM elements. There is no plugin, flag, or configuration to redirect these to class-based or `<style>`-element-based injection.

### Recommended Path Forward

**CSS-native animations** using `@keyframes` and Tailwind `animate-*` utilities for the 15 affected components. Most Canvas framer-motion usage falls into simple patterns:

| Pattern | Count | CSS Alternative |
|---------|-------|-----------------|
| Fade + slide entrance | 8 | `@keyframes fade-slide-up` (already exists in animations.css) |
| Scale entrance | 2 | `@keyframes scale-in` |
| Staggered list items | 3 | CSS `animation-delay` with custom properties |
| Nav slide | 1 | CSS `transition` with data attributes |
| Hover scale | 1 | CSS `transform` on `:hover` |

### Migration Plan

1. Create CSS animation classes for each pattern in `animations.css`
2. Replace `motion.*` components with standard elements + CSS classes
3. For staggered animations, use `style={{ animationDelay }}` (single property, minimal CSP impact) or CSS custom properties
4. Remove framer-motion from Canvas `peerDependencies` after migration
5. Estimated scope: M (2-3 days), 15 components affected

### Risk

framer-motion is a large dependency (~30KB gzipped). Removing it reduces bundle size for all consuming apps. The main risk is visual regression -- each component needs visual verification after migration.

## Decision

Document framer-motion as a CSP blocker. Create a follow-up ticket (canvas#XX) for CSS-native animation migration. This follow-up is a dependency gate for hera#48 Phase 2.

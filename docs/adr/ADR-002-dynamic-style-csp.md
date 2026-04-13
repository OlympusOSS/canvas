# ADR-002: DynamicStyle Architecture for CSP-Compliant Dynamic Styling

**Status:** Accepted
**Date:** 2026-04-13
**Context:** canvas#46 (Eliminate JSX inline style props)

## Decision

Replace all JSX `style={}` props in Canvas production components with a DynamicStyle system that injects nonce-tagged `<style>` elements instead of using `style` attributes on HTML elements. This enables removing `unsafe-inline` from CSP `style-src` (prerequisite for hera#48 Phase 2).

## Architecture

- **DynamicStyleProvider** -- root-level React Context provider. Reads CSP nonce from `<meta name="csp-nonce">`.
- **DynamicStyleScope** -- boundary component collecting dynamic CSS rules from children, rendering a single nonce-tagged `<style>` element. Uses `requestAnimationFrame` batching.
- **useDynamicStyle()** -- hook for components to register dynamic CSS rules. Returns `{ className, style }` where `style` is the fallback when no scope is present.
- **StyleRegistry** -- internal `Map<className, properties>` with batched DOM updates.
- **CSS Sanitizer** -- allowlist-based validation of CSS values before injection (SR-1/canvas#47).

## Consequences

- Static inline styles replaced with Tailwind utilities (12 occurrences)
- Dynamic values use `useDynamicStyle()` with fallback to inline styles when no provider is present
- Consuming apps need `<DynamicStyleProvider>` wrapper (one-line additive change)
- Framer-motion inline styles remain as a separate concern (see ADR-003)

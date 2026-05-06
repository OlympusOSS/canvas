---
"@olympusoss/canvas": patch
---

Fix: Drawer now opens correctly inside iframe / portal-container contexts, and clicking the visual handle cycles snap points.

- `Drawer` (Vaul `Root`) now reads from `usePortalContainer()` and forwards a `container` prop to Vaul. Without this, Vaul portaled into the parent document's `body` instead of the iframe's, so the drawer mounted offscreen and appeared unresponsive in docs/Storybook iframes. Existing consumers can still override by passing `container` explicitly.
- The pill at the top of `DrawerContent` is now `DrawerPrimitive.Handle` instead of a plain `<div>`. Vaul's `Handle` cycles through `snapPoints` on click — previously the visual-only div did nothing when clicked. Also exported as `DrawerHandle` for consumers who want to compose the handle manually.

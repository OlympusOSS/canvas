---
"@olympusoss/canvas": patch
---

Docs: Fix the `ErrorBoundary` custom-fallback example so the Retry button visibly recovers.

The previous example wrapped a `Crashy` component that always threw on every render — clicking Retry correctly reset the boundary, but the child re-threw immediately, so the user saw the same fallback and assumed Retry was broken. Updated to mirror the default example: `Crashy` accepts `shouldThrow`, parent state controls it, and Retry both flips that state and resets the boundary so the success branch can render.

The `ErrorBoundary` component itself was correct — only the example needed fixing.

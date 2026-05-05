---
"@olympusoss/canvas": patch
---

Fix: `AlertDialog` and `Dialog` footer buttons now stay vertically aligned in horizontal layout. The previous behavior left a stray `mt-2` on `AlertDialogCancel` when the `sm:mt-0` reset didn't fire (e.g. when the dialog renders inside a constrained iframe context), pushing Cancel 8px below the action button. Footer layout now uses `gap-2 sm:items-center sm:justify-end` (matching the canvas-canonical `ActionBar` pattern) and `AlertDialogCancel` no longer carries a hand-rolled margin. Consumers with custom `mt-*` overrides on `AlertDialogCancel` can drop them.

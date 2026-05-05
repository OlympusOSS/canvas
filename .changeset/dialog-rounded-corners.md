---
"@olympusoss/canvas": patch
---

Fix: `AlertDialogContent` and `DialogContent` now have unconditional `rounded-lg` corners. The previous `sm:rounded-lg` only fired at viewport ≥640px and was unreliable in iframe / portal contexts where the `sm:` breakpoint didn't match — the dialog rendered with sharp square corners instead of the rounded modal style. Same `sm:`-reliability lesson as the previous footer alignment fix.

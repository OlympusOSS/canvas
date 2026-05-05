---
"@olympusoss/canvas": minor
---

`DashboardGrid` now renders a "Remove" button at the bottom-center of each widget when `editing` is true. Clicking it filters the item out of the controlled list and fires `onItemsChange`. Pairs with the existing top-right drag handle to give consumers a complete customize-mode UX (reorder + resize + delete) without writing per-widget chrome.

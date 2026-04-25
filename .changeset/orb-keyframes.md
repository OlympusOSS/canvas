---
"@olympusoss/canvas": patch
---

Add `@keyframes orb-float-1` and `@keyframes orb-float-2` to `styles/tokens.css`. The `AnimatedBackground` molecule references these keyframe names but did not ship the definitions, so consumers had to re-declare them locally to get the drifting orb animation. Now the contract is self-contained: any app importing `@olympusoss/canvas/styles/tokens.css` gets the animations for free.

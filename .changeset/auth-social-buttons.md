---
"@olympusoss/canvas": minor
---

Add `SocialButtons` and `OrSeparator` molecules for auth flows.

`SocialButtons` renders a vertical stack of provider buttons (GitHub,
Google, Apple, Microsoft, generic SSO). Outline-style with monochrome or
multi-color brand glyphs depending on the provider. Stays purely
presentational; callers wire `onProviderClick` to their OAuth2
initiation flow.

`OrSeparator` is a small two-rule divider with a centred label (default
`"or"`) sized to sit on a card surface between sections of an auth form.

Exports: `SocialButton`, `SocialButtonProps`, `SocialButtons`,
`SocialButtonsProps`, `SocialProvider`, `OrSeparator`, `OrSeparatorProps`.

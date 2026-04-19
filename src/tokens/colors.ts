/**
 * shadcn/ui default color tokens — platform-agnostic.
 * Used by both web (via CSS custom properties) and React Native (via NativeWind/direct).
 *
 * Values are HSL arrays [h, s%, l%] matching the shadcn zinc/neutral theme.
 */

export const colors = {
  light: {
    background: [0, 0, 100],
    foreground: [240, 10, 3.9],
    card: [0, 0, 100],
    cardForeground: [240, 10, 3.9],
    popover: [0, 0, 100],
    popoverForeground: [240, 10, 3.9],
    primary: [240, 5.9, 10],
    primaryForeground: [0, 0, 98],
    secondary: [240, 4.8, 95.9],
    secondaryForeground: [240, 5.9, 10],
    muted: [240, 4.8, 95.9],
    mutedForeground: [240, 3.8, 46.1],
    accent: [240, 4.8, 95.9],
    accentForeground: [240, 5.9, 10],
    destructive: [0, 84.2, 60.2],
    destructiveForeground: [0, 0, 98],
    border: [240, 5.9, 90],
    input: [240, 5.9, 90],
    ring: [240, 5.9, 10],
    chart1: [12, 76, 61],
    chart2: [173, 58, 39],
    chart3: [197, 37, 24],
    chart4: [43, 74, 66],
    chart5: [27, 87, 67],
    sidebar: {
      background: [0, 0, 98],
      foreground: [240, 5.3, 26.1],
      primary: [240, 5.9, 10],
      primaryForeground: [0, 0, 98],
      accent: [240, 4.8, 95.9],
      accentForeground: [240, 5.9, 10],
      border: [220, 13, 91],
      ring: [217.2, 91.2, 59.8],
    },
  },
  dark: {
    background: [240, 10, 3.9],
    foreground: [0, 0, 98],
    card: [240, 10, 3.9],
    cardForeground: [0, 0, 98],
    popover: [240, 10, 3.9],
    popoverForeground: [0, 0, 98],
    primary: [0, 0, 98],
    primaryForeground: [240, 5.9, 10],
    secondary: [240, 3.7, 15.9],
    secondaryForeground: [0, 0, 98],
    muted: [240, 3.7, 15.9],
    mutedForeground: [240, 5, 64.9],
    accent: [240, 3.7, 15.9],
    accentForeground: [0, 0, 98],
    destructive: [0, 62.8, 30.6],
    destructiveForeground: [0, 0, 98],
    border: [240, 3.7, 15.9],
    input: [240, 3.7, 15.9],
    ring: [240, 4.9, 83.9],
    chart1: [220, 70, 50],
    chart2: [160, 60, 45],
    chart3: [30, 80, 55],
    chart4: [280, 65, 60],
    chart5: [340, 75, 55],
    sidebar: {
      background: [240, 5.9, 10],
      foreground: [240, 4.8, 95.9],
      primary: [224.3, 76.3, 48],
      primaryForeground: [0, 0, 100],
      accent: [240, 3.7, 15.9],
      accentForeground: [240, 4.8, 95.9],
      border: [240, 3.7, 15.9],
      ring: [217.2, 91.2, 59.8],
    },
  },
} as const;

/** Convert an HSL tuple to a CSS-compatible string */
export function hslToString(hsl: readonly [number, number, number]): string {
  return `hsl(${hsl[0]} ${hsl[1]}% ${hsl[2]}%)`;
}

/** Convert an HSL tuple to the space-separated format used in CSS variables */
export function hslToVar(hsl: readonly [number, number, number]): string {
  return `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`;
}

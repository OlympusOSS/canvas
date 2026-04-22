/**
 * Olympus typography tokens — platform-agnostic design tokens.
 * Font families, sizes, weights, and line heights.
 */

export const fontFamily = {
	sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
	mono: ["JetBrains Mono", "Fira Code", "monospace"],
} as const;

export const fontSize = {
	xs: { size: 12, lineHeight: 16 },
	sm: { size: 14, lineHeight: 20 },
	base: { size: 16, lineHeight: 24 },
	lg: { size: 18, lineHeight: 28 },
	xl: { size: 20, lineHeight: 28 },
	"2xl": { size: 24, lineHeight: 32 },
	"3xl": { size: 30, lineHeight: 36 },
	"4xl": { size: 36, lineHeight: 40 },
} as const;

export const fontWeight = {
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
} as const;

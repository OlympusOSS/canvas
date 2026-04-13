/**
 * CSS Value Sanitizer for DynamicStyle system (SR-1 / canvas#47)
 *
 * Validates CSS property values before injection into <style> elements
 * to prevent CSS injection attacks (rule breakout, data exfiltration, UI redressing).
 *
 * Uses an allowlist approach: only known-safe patterns are permitted.
 */

/** Patterns that indicate a CSS injection attempt */
const DANGEROUS_PATTERNS = [
	/[{}]/,                        // CSS rule breakout
	/<\/?style/i,                  // Style tag injection
	/url\s*\(\s*(?!data:image\/)/i, // url() with non-data-image schemes
	/@import/i,                    // CSS import injection
	/expression\s*\(/i,           // IE expression() attack
	/javascript\s*:/i,            // JavaScript protocol
	/-moz-binding/i,              // Firefox XBL binding
	/behavior\s*:/i,              // IE behavior
	/\\[0-9a-fA-F]/,              // CSS escape sequences (obfuscation)
];

/** Allowlist of safe CSS value patterns */
const SAFE_PATTERNS = [
	/^#[0-9a-fA-F]{3,8}$/,                          // Hex colors: #fff, #ffffff, #ffffff80
	/^[0-9]+(\.[0-9]+)?(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|svh|svw|dvh|dvw|lvh|lvw)?$/, // CSS lengths
	/^-?[0-9]+(\.[0-9]+)?(px|em|rem|%|vh|vw|vmin|vmax|ch|ex)?$/, // Negative lengths
	/^(auto|none|inherit|initial|unset|revert|currentColor|transparent)$/i, // CSS keywords
	/^(fit-content|max-content|min-content)$/i,       // Sizing keywords
	/^[a-zA-Z]+$/,                                    // Named colors (red, blue, etc.)
	/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0|1|0?\.\d+))?\s*\)$/, // rgb/rgba
	/^hsla?\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*(,\s*(0|1|0?\.\d+))?\s*\)$/, // hsl/hsla
	/^hsl\(\s*\d+\s+\d+%?\s+\d+%?\s*(\/\s*(0|1|0?\.\d+))?\s*\)$/, // Modern hsl()
	/^[0-9]+(\.[0-9]+)?\s+[0-9]+(\.[0-9]+)?\s+(auto)$/, // flex shorthand
	/^calc\([^)(]*(\([^)(]*\))*[^)(]*\)$/,           // Simple calc()
	/^var\(--[a-zA-Z0-9-]+\)$/,                       // CSS custom properties
	/^[0-9]+(\.[0-9]+)?$/,                            // Plain numbers (flex-grow, opacity)
	/^(row|column|row-reverse|column-reverse)$/i,     // Flexbox directions
	/^(flex|block|inline|inline-flex|inline-block|grid|inline-grid)$/i, // Display values
	/^(stretch|center|start|end|flex-start|flex-end|baseline|space-between|space-around|space-evenly)$/i, // Alignment
	/^(hidden|visible|scroll|auto|overlay)$/i,        // Overflow values
	/^(absolute|relative|fixed|sticky|static)$/i,     // Position values
	/^(0|[0-9]+(\.[0-9]+)?(px|em|rem|%))\s+(0|[0-9]+(\.[0-9]+)?(px|em|rem|%))\s+(0|[0-9]+(\.[0-9]+)?(px|em|rem|%))\s+(0|[0-9]+(\.[0-9]+)?(px|em|rem|%))$/, // 4-value shorthand (padding, margin)
	/^linear-gradient\([^)(]*(\([^)(]*\))*[^)(]*\)$/, // Linear gradients
	/^radial-gradient\([^)(]*(\([^)(]*\))*[^)(]*\)$/, // Radial gradients
	/^data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+$/,  // Data URI images (base64)
	/^url\(\s*["']?data:image\/[a-z+]+;base64,[A-Za-z0-9+/=]+["']?\s*\)$/, // url(data:image/...)
];

/**
 * Sanitize a CSS value for safe injection into a <style> element.
 *
 * @param value - The CSS value to validate
 * @returns The sanitized value
 * @throws Error if the value contains dangerous patterns
 */
export function sanitizeCssValue(value: string): string {
	const trimmed = value.trim();

	// Empty values are safe
	if (trimmed === "") return trimmed;

	// Check for dangerous patterns first (denylist as defense-in-depth)
	for (const pattern of DANGEROUS_PATTERNS) {
		if (pattern.test(trimmed)) {
			throw new Error(`[DynamicStyle] Unsafe CSS value rejected: "${trimmed}"`);
		}
	}

	// Check against allowlist
	for (const pattern of SAFE_PATTERNS) {
		if (pattern.test(trimmed)) {
			return trimmed;
		}
	}

	// Compound values: split by spaces and validate each token
	const tokens = trimmed.split(/\s+/);
	if (tokens.length > 1 && tokens.length <= 6) {
		const allTokensSafe = tokens.every((token) =>
			SAFE_PATTERNS.some((pattern) => pattern.test(token))
		);
		if (allTokensSafe) return trimmed;
	}

	throw new Error(`[DynamicStyle] CSS value did not match safe patterns: "${trimmed}"`);
}

/**
 * Check if a CSS value is safe without throwing.
 */
export function isSafeCssValue(value: string): boolean {
	try {
		sanitizeCssValue(value);
		return true;
	} catch {
		return false;
	}
}

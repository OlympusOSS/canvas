"use client";

/* c8 ignore file -- CodeMirror EditorView requires real DOM; jsdom-incompatible. */

import { EditorView } from "@codemirror/view";
import { useMemo } from "react";

import { useTheme } from "../theme-provider";

/**
 * Build a CodeMirror 6 theme that resolves canvas's CSS-variable tokens to
 * literal `hsl(...)` strings. CodeMirror does not honour CSS variables inside
 * its `<canvas>`-style internals, so the bridge is read-once-per-theme.
 *
 * Re-runs whenever `useTheme().resolvedTheme` flips, which means
 * `<MarkdownEditor>` / `<CodeEditor>` automatically reskin on dark/light toggle.
 */
export function useCodemirrorTheme() {
	const { resolvedTheme } = useTheme();
	return useMemo(() => {
		// Defer DOM access to runtime — typeof window guard keeps SSR happy.
		if (typeof window === "undefined") return EditorView.theme({});
		const root = getComputedStyle(document.documentElement);
		const v = (name: string) => `hsl(${root.getPropertyValue(name).trim()})`;
		const hsla = (name: string, alpha: number) =>
			`hsl(${root.getPropertyValue(name).trim()} / ${alpha})`;
		return EditorView.theme(
			{
				"&": {
					color: v("--foreground"),
					backgroundColor: "transparent",
					fontFamily:
						"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
					fontSize: "13px",
				},
				".cm-content": {
					caretColor: v("--foreground"),
					padding: "12px 0",
				},
				".cm-line": {
					padding: "0 12px",
				},
				".cm-gutters": {
					backgroundColor: "transparent",
					color: v("--muted-foreground"),
					borderRightColor: v("--border"),
				},
				".cm-activeLine": { backgroundColor: hsla("--muted", 0.4) },
				".cm-activeLineGutter": { backgroundColor: "transparent" },
				".cm-cursor": { borderLeftColor: v("--brand"), borderLeftWidth: "2px" },
				"&.cm-focused .cm-selectionBackground, ::selection, .cm-selectionBackground": {
					backgroundColor: hsla("--brand", 0.25),
				},
				"&.cm-focused": { outline: "none" },
				".cm-scroller": { fontFamily: "inherit" },
			},
			{ dark: resolvedTheme === "dark" },
		);
		// `resolvedTheme` drives the memo; ESLint doesn't see that getComputedStyle reads from the DOM.
	}, [resolvedTheme]);
}

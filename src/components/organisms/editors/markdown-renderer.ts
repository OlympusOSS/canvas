"use client";

/* c8 ignore file -- DOMPurify + marked require a real DOM; jsdom-incompatible.
 * Verified visually in the docs site. */

import DOMPurify from "dompurify";
import { marked } from "marked";

// GFM (tables, task lists, autolinks) is on by default in marked v15+ but
// kept explicit for clarity and forward-compat.
marked.setOptions({ gfm: true, breaks: false });

/**
 * Convert a markdown string to a DOMPurify-sanitized HTML string suitable for
 * `dangerouslySetInnerHTML`. Strips `<script>`, inline event handlers, and
 * `javascript:` URLs.
 *
 * Used by `<MarkdownEditor preview>` for the live preview pane. The editor
 * is a `"use client"` component, so this only ever runs in the browser.
 */
export function renderMarkdown(source: string): string {
	if (typeof window === "undefined") return "";
	const html = marked.parse(source, { async: false }) as string;
	return DOMPurify.sanitize(html, {
		ADD_ATTR: ["target", "rel"],
	});
}

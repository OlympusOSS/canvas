/**
 * Tailwind class string applied to the editable surface of `RichTextEditor`
 * and the rendered preview of `MarkdownEditor`. Replaces the role of
 * `@tailwindcss/typography`'s `prose` plugin with token-aware styles so the
 * surface respects whichever canvas theme is active.
 *
 * Use this on a wrapping `<div>` around `<EditorContent />` (Tiptap) or
 * around the rendered HTML output (markdown preview).
 */
export const PROSE_CANVAS_CLASSES = [
	// base text
	"text-foreground text-sm leading-relaxed",
	// paragraphs
	"[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
	// headings
	"[&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground",
	"[&_h2]:mt-3 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
	"[&_h3]:mt-3 [&_h3]:mb-1 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
	"[&_h4]:mt-3 [&_h4]:mb-1 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-foreground",
	"[&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 [&_h4:first-child]:mt-0",
	// inline emphasis
	"[&_strong]:font-semibold [&_strong]:text-foreground",
	"[&_em]:italic",
	"[&_u]:underline [&_u]:underline-offset-2",
	"[&_s]:line-through",
	// links
	"[&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-brand/40 hover:[&_a]:decoration-brand",
	// code
	"[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground",
	"[&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/50 [&_pre]:p-3 [&_pre]:my-3 [&_pre]:overflow-x-auto",
	"[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm",
	// lists
	"[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6",
	"[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6",
	"[&_li]:my-1 [&_li_p]:my-0",
	"[&_li::marker]:text-muted-foreground",
	// blockquote
	"[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:my-3 [&_blockquote]:text-muted-foreground [&_blockquote]:italic",
	// horizontal rule
	"[&_hr]:my-4 [&_hr]:border-border",
	// tables (GFM)
	"[&_table]:my-3 [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse",
	"[&_th]:border [&_th]:border-border [&_th]:bg-muted/40 [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left [&_th]:font-semibold",
	"[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-1.5",
].join(" ");

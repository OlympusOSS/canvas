import { marked } from "marked";
import { useMemo } from "react";

interface MarkdownProps {
	content: string;
}

const renderer = new marked.Renderer();
renderer.heading = ({ tokens, depth }) => {
	const text = renderer.parser.parseInline(tokens);
	const slug = text
		.toLowerCase()
		.replace(/<[^>]+>/g, "")
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-");
	const sizes: Record<number, string> = {
		1: "mt-10 text-3xl font-bold tracking-tight text-foreground",
		2: "mt-10 text-2xl font-semibold tracking-tight text-foreground",
		3: "mt-6 text-base font-semibold text-foreground",
		4: "mt-4 text-sm font-semibold text-foreground",
		5: "mt-3 text-sm font-semibold text-foreground",
		6: "mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
	};
	const cls = `${sizes[depth] ?? sizes[3]} scroll-mt-20`;
	return `<h${depth} id="${slug}" class="${cls}">${text}</h${depth}>\n`;
};

renderer.paragraph = ({ tokens }) => {
	const inner = renderer.parser.parseInline(tokens);
	return `<p class="my-3 text-sm leading-relaxed text-muted-foreground">${inner}</p>\n`;
};

renderer.list = ({ items, ordered }) => {
	const tag = ordered ? "ol" : "ul";
	const cls = ordered ? "list-decimal" : "list-disc";
	const inner = items
		.map((item) => {
			const content = renderer.parser.parse(item.tokens);
			return `<li class="text-sm leading-relaxed text-muted-foreground">${content}</li>`;
		})
		.join("\n");
	return `<${tag} class="my-3 ${cls} space-y-1 pl-5 marker:text-muted-foreground/40">${inner}</${tag}>\n`;
};

renderer.code = ({ text, lang }) => {
	const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const langLabel = lang
		? `<div class="border-b border-border bg-muted/30 px-3 py-1 font-mono text-[11px] text-muted-foreground">${lang}</div>`
		: "";
	return `<div class="my-3 overflow-hidden rounded-md border border-border bg-card/50">${langLabel}<pre class="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground"><code>${escaped}</code></pre></div>\n`;
};

renderer.codespan = ({ text }) => {
	return `<code class="rounded bg-muted/40 px-1 py-0.5 font-mono text-[13px] text-foreground">${text}</code>`;
};

renderer.link = ({ href, tokens }) => {
	const text = renderer.parser.parseInline(tokens);
	const external = href.startsWith("http");
	const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : "";
	return `<a href="${href}"${attrs} class="font-medium text-foreground underline-offset-4 hover:underline">${text}</a>`;
};

renderer.table = ({ header, rows }) => {
	const head = header
		.map(
			(h) =>
				`<th class="px-3 py-2 text-left font-medium uppercase tracking-wider">${renderer.parser.parseInline(h.tokens)}</th>`,
		)
		.join("");
	const body = rows
		.map(
			(row) =>
				`<tr>${row
					.map(
						(cell) =>
							`<td class="px-3 py-2 align-top">${renderer.parser.parseInline(cell.tokens)}</td>`,
					)
					.join("")}</tr>`,
		)
		.join("");
	return `<div class="my-4 overflow-x-auto rounded-md border border-border"><table class="w-full text-xs"><thead class="bg-muted/40 text-muted-foreground">${head}</thead><tbody class="divide-y divide-border">${body}</tbody></table></div>\n`;
};

marked.setOptions({ gfm: true, breaks: false });

export function Markdown({ content }: MarkdownProps) {
	const html = useMemo(
		() => marked.parse(content, { renderer, async: false }) as string,
		[content],
	);
	return <div className="prose-canvas" dangerouslySetInnerHTML={{ __html: html }} />;
}

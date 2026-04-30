import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
	PortalContainerProvider,
	ToggleGroup,
	ToggleGroupItem,
} from "@olympusoss/canvas";
import { type ReactNode, useEffect, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { DocsCodeBlock } from "./DocsCodeBlock";

type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTH: Record<Viewport, string> = {
	desktop: "1024px", // Fixed desktop viewport so Tailwind `md:` etc. behave like a real desktop.
	tablet: "768px",
	mobile: "390px",
};

// Iframe height is driven entirely by the rendered content (measured via
// ResizeObserver on the React mount root). MIN is 1 so the iframe fits its
// content exactly without leaving an empty band at the bottom that would
// reveal the example body's tint through the iframe.
const MIN_FRAME_HEIGHT = 1;
const MAX_FRAME_HEIGHT = 720;

interface ExampleProps {
	title: string;
	description?: string;
	code: string;
	filename?: string;
	stackblitzTitle?: string;
	children: ReactNode;
}

/**
 * Build the iframe's `<head>` by cloning every `<link rel="stylesheet">` and
 * `<style>` tag from the parent document. Lets Vite-injected CSS (Tailwind v4
 * @source / @theme inline output) reach the frame so canvas tokens resolve
 * inside the example's own viewport.
 *
 * Captured ONCE on mount and never updated. We deliberately don't observe
 * `document.head` — some libraries (input-otp's noScriptCSSFallback, etc.)
 * inject `<style>` tags lazily when they mount inside the iframe, which
 * mutates the parent document.head, which would re-fire a MutationObserver
 * and re-mount the iframe → re-mount the library → infinite loop.
 */
function useFrameHead() {
	const [head, setHead] = useState("");
	useEffect(() => {
		const collected = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
			.map((el) => el.outerHTML)
			.join("\n");
		setHead(collected);
	}, []);
	return head;
}

/** Mirror the page's dark-mode class onto the iframe's <html>. */
function useDarkClassMirror(doc: Document | undefined) {
	useEffect(() => {
		if (!doc) return;
		const apply = () => {
			const isDark = document.documentElement.classList.contains("dark");
			doc.documentElement.classList.toggle("dark", isDark);
		};
		apply();
		const obs = new MutationObserver(apply);
		obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => obs.disconnect();
	}, [doc]);
}

interface PreviewFrameProps {
	viewport: Viewport;
	children: ReactNode;
}

function PreviewFrame({ viewport, children }: PreviewFrameProps) {
	const head = useFrameHead();
	const [height, setHeight] = useState(MIN_FRAME_HEIGHT);
	const initialContent = `<!DOCTYPE html><html style="overflow:hidden;"><head>${head}</head><body style="margin:0;background:transparent;position:relative;overflow:hidden;"><div id="frame-root"></div></body></html>`;

	return (
		<div
			// The viewport width sits on a wrapping div so the iframe inside it
			// can't be shrunk by flex layout — Tailwind's `md:` breakpoint then
			// reflects the desktop/tablet/mobile choice instead of the parent column.
			// No maxWidth here on purpose: at desktop=1024px we WANT the parent to
			// horizontally scroll if the docs column is narrower, so the example
			// still renders at a true desktop viewport.
			style={{
				width: VIEWPORT_WIDTH[viewport],
				flexShrink: 0,
				transition: "width 200ms ease",
			}}
		>
			<Frame
				key={head ? "ready" : "loading"}
				initialContent={initialContent}
				mountTarget="#frame-root"
				style={{
					width: "100%",
					height: `${height}px`,
					border: "1px solid hsl(var(--border))",
					borderRadius: 8,
					background: "transparent",
					display: "block",
				}}
			>
				<FrameContextConsumer>
					{({ document: frameDoc }) => (
						<FrameMount frameDoc={frameDoc as Document | undefined} onHeightChange={setHeight}>
							{children}
						</FrameMount>
					)}
				</FrameContextConsumer>
			</Frame>
		</div>
	);
}

interface FrameMountProps {
	frameDoc: Document | undefined;
	onHeightChange: (height: number) => void;
	children: ReactNode;
}

function FrameMount({ frameDoc, onHeightChange, children }: FrameMountProps) {
	useDarkClassMirror(frameDoc);

	useEffect(() => {
		if (!frameDoc) return;
		// Measure the React mount root — NOT the body or documentElement.
		// In an iframe the document/html/body always extend to the iframe's
		// viewport size, so measuring them just echoes the current iframe
		// height back instead of the actual content height. The mount root
		// (`#frame-root`) shrinks to fit its children, giving us the real
		// content size when an example renders smaller than the iframe.
		const root = frameDoc.getElementById("frame-root");
		if (!root) return;
		const measure = () => {
			const measured = root.getBoundingClientRect().height;
			const clamped = Math.min(MAX_FRAME_HEIGHT, Math.max(MIN_FRAME_HEIGHT, Math.ceil(measured)));
			onHeightChange(clamped);
		};
		const ro = new ResizeObserver(measure);
		ro.observe(root);
		measure();
		return () => ro.disconnect();
	}, [frameDoc, onHeightChange]);

	// Bare canvas: no padding, no centring, no min-height. The iframe sizes to
	// the body's content via ResizeObserver; per-example wrappers provide their
	// own min-height where needed. PortalContainerProvider redirects Radix
	// portals (Select, DropdownMenu, Popover, …) into the iframe's body so
	// click-outside detection doesn't see the iframe boundary as "outside".
	return (
		<PortalContainerProvider value={frameDoc?.body ?? null}>
			<div className="bg-background text-foreground">{children}</div>
		</PortalContainerProvider>
	);
}

export function Example({
	title,
	description,
	code,
	filename = "App.tsx",
	children,
}: ExampleProps) {
	const [open, setOpen] = useState(false);
	const [viewport, setViewport] = useState<Viewport>("desktop");

	return (
		<section className="overflow-hidden rounded-xl border border-border bg-card/30">
			<header className="flex items-start justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3">
				<div className="min-w-0">
					<h3 className="text-sm font-semibold text-foreground">{title}</h3>
					{description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
				</div>
				<ToggleGroup
					type="single"
					value={viewport}
					onValueChange={(v) => v && setViewport(v as Viewport)}
					size="sm"
					variant="outline"
					className="shrink-0"
					aria-label="Preview viewport"
				>
					<ToggleGroupItem value="desktop" aria-label="Desktop">
						<Icon name="Monitor" className="h-3.5 w-3.5" />
					</ToggleGroupItem>
					<ToggleGroupItem value="tablet" aria-label="Tablet">
						<Icon name="Tablet" className="h-3.5 w-3.5" />
					</ToggleGroupItem>
					<ToggleGroupItem value="mobile" aria-label="Mobile">
						<Icon name="Smartphone" className="h-3.5 w-3.5" />
					</ToggleGroupItem>
				</ToggleGroup>
			</header>
			<div className="overflow-x-auto bg-muted/20">
				{/* Example body shrinks with the viewport toggle. Desktop = the docs
				    column (which we widened to 1400px max-w in Layout.tsx so 1024px
				    fits with room for the right TOC); tablet/mobile shrink the whole
				    card to the chosen breakpoint width. */}
				<div className="flex justify-center p-4">
					<PreviewFrame viewport={viewport}>{children}</PreviewFrame>
				</div>
			</div>
			<Collapsible open={open} onOpenChange={setOpen}>
				<CollapsibleTrigger asChild>
					<button
						type="button"
						className="flex w-full items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
					>
						<span className="font-mono">{filename}</span>
						<span className="flex items-center gap-1.5">
							<span>{open ? "Hide" : "Show"} code</span>
							<Icon
								name="ChevronDown"
								className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
							/>
						</span>
					</button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="border-t border-border p-3">
						<DocsCodeBlock code={code} language="tsx" filename={filename} />
					</div>
				</CollapsibleContent>
			</Collapsible>
		</section>
	);
}

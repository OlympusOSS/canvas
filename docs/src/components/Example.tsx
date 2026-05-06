import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
	PortalContainerProvider,
	ToggleGroup,
	ToggleGroupItem,
} from "@olympusoss/canvas";
import { type ReactNode, useEffect, useRef, useState } from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import canvasRuntimeCssUrl from "../../../styles/canvas.css?url";
import { DocsCodeBlock } from "./DocsCodeBlock";

type Viewport = "lg" | "md" | "sm" | "xs" | "xxs";

// `lg` fills the full example area (the breakpoint is open-ended at the top, so
// the truthful preview is "whatever width the consumer's lg layout actually
// gets"). The other tiers use a fixed width that comfortably sits inside the
// breakpoint band so authors can preview each tier deterministically.
const VIEWPORT_WIDTH: Record<Viewport, string> = {
	lg: "100%",
	md: "1024px",
	sm: "800px",
	xs: "600px",
	xxs: "360px",
};

// Column counts mirror the canvas grid defaults (DashboardGrid, etc.) so authors
// can map each breakpoint back to how many columns their layout will get.
const VIEWPORT_LABEL: Record<Viewport, string> = {
	lg: "lg ≥ 1200px (12col)",
	md: "md ≥ 996px (8col)",
	sm: "sm ≥ 768px (4col)",
	xs: "xs ≥ 480px (2col)",
	xxs: "xxs < 480px (1col)",
};

const VIEWPORTS: Viewport[] = ["lg", "md", "sm", "xs", "xxs"];

// Mirrors canvas's responsive breakpoints (lg ≥ 1200, md ≥ 996, sm ≥ 768,
// xs ≥ 480, xxs < 480) so the toggle highlight reflects which tier the
// iframe's actual width currently lands in — keeps the docs honest when the
// browser is resized below the lg threshold while `lg` (100%) is selected.
function widthToBreakpoint(width: number): Viewport {
	if (width >= 1200) return "lg";
	if (width >= 996) return "md";
	if (width >= 768) return "sm";
	if (width >= 480) return "xs";
	return "xxs";
}

// Iframe height is driven entirely by the rendered content (measured via
// ResizeObserver on the React mount root). MIN is 1 so the iframe fits its
// content exactly without leaving an empty band at the bottom that would
// reveal the example body's tint through the iframe.
const MIN_FRAME_HEIGHT = 1;
const MAX_FRAME_HEIGHT = 1400;

interface ExampleProps {
	title: string;
	description?: string;
	code: string;
	filename?: string;
	stackblitzTitle?: string;
	children: ReactNode;
}

/**
 * Iframe head: a single <link> pointing at the compiled canvas-runtime
 * stylesheet (canvas/styles/canvas.css), resolved via Vite `?url`.
 *
 * Why this beats cloning parent <style>/<link> tags:
 *   - In dev Vite injects every imported CSS module as its own <style> tag,
 *     but in prod they're all bundled into one hashed stylesheet — so any
 *     filter that tries to keep "only canvas.css" from the parent doc
 *     either keeps the bundled file (defeating isolation) or drops it
 *     (leaving examples unstyled). `?url` sidesteps the question by giving
 *     us a stable URL to the canvas-runtime asset in BOTH modes.
 *   - `?url` resolves through Vite's full pipeline including @tailwindcss/vite,
 *     so the served file is the compiled output (Tailwind utilities scanned
 *     from canvas/src + tokens + leaflet) — exactly what an example needs.
 *   - The iframe ends up with ONLY canvas-runtime CSS. No docs chrome
 *     (sidebar, hero, prose, animations) leaks in. Mirrors a real consumer
 *     app's render environment.
 */

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

/**
 * Relay mouse events from the parent frame into the iframe during drag.
 *
 * Leaflet (and other drag-based libraries) listen for `mousemove`/`mouseup` on
 * `document`. Inside an iframe, those events stop arriving when the cursor
 * crosses the iframe boundary. This hook detects that scenario and relays the
 * parent-frame events into the iframe's document so the drag continues smoothly.
 */
function useIframeDragRelay(frameDoc: Document | undefined) {
	useEffect(() => {
		if (!frameDoc) return;
		const frameWin = frameDoc.defaultView;
		if (!frameWin || frameWin === frameWin.parent) return;

		const iframe = frameWin.frameElement as HTMLIFrameElement | null;
		if (!iframe) return;

		const parentDoc = frameWin.parent.document;
		let dragging = false;
		let relayBound = false;

		const relay = (type: string) => (e: MouseEvent) => {
			const rect = iframe.getBoundingClientRect();
			frameDoc.dispatchEvent(
				new MouseEvent(type, {
					clientX: e.clientX - rect.left,
					clientY: e.clientY - rect.top,
					screenX: e.screenX,
					screenY: e.screenY,
					button: e.button,
					buttons: e.buttons,
					bubbles: true,
					cancelable: true,
				}),
			);
			if (type === "mouseup") teardown();
		};

		const relayMove = relay("mousemove");
		const relayUp = relay("mouseup");

		const setup = () => {
			if (relayBound) return;
			relayBound = true;
			parentDoc.addEventListener("mousemove", relayMove, true);
			parentDoc.addEventListener("mouseup", relayUp, true);
		};

		const teardown = () => {
			dragging = false;
			if (!relayBound) return;
			relayBound = false;
			parentDoc.removeEventListener("mousemove", relayMove, true);
			parentDoc.removeEventListener("mouseup", relayUp, true);
		};

		const onDown = () => {
			dragging = true;
		};
		const onUp = () => teardown();
		const onLeave = () => {
			if (dragging) setup();
		};

		frameDoc.addEventListener("mousedown", onDown);
		frameDoc.addEventListener("mouseup", onUp);
		iframe.addEventListener("mouseleave", onLeave);

		return () => {
			teardown();
			frameDoc.removeEventListener("mousedown", onDown);
			frameDoc.removeEventListener("mouseup", onUp);
			iframe.removeEventListener("mouseleave", onLeave);
		};
	}, [frameDoc]);
}

interface PreviewFrameProps {
	viewport: Viewport;
	onWidthChange: (width: number) => void;
	children: ReactNode;
}

function PreviewFrame({ viewport, onWidthChange, children }: PreviewFrameProps) {
	const [height, setHeight] = useState(MIN_FRAME_HEIGHT);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	// `overflow-y: auto` so a themed vertical scrollbar appears when example
	// content exceeds MAX_FRAME_HEIGHT (otherwise content > 1400px would be
	// silently clipped). `overflow-x: hidden` keeps the horizontal axis fixed
	// so the iframe doesn't double-scroll horizontally with the parent docs
	// column at narrow viewports.
	const initialContent = `<!DOCTYPE html><html style="overflow-y:auto;overflow-x:hidden;"><head><link rel="stylesheet" href="${canvasRuntimeCssUrl}"></head><body style="margin:0;background:transparent;"><div id="frame-root"></div></body></html>`;

	// Report the wrapper's actual rendered width up so the toggle can reflect
	// which canvas breakpoint it lands in — matters for `lg` (100%) which
	// changes as the user resizes the browser.
	useEffect(() => {
		const el = wrapperRef.current;
		if (!el) return;
		const report = () => onWidthChange(el.clientWidth);
		report();
		if (typeof ResizeObserver === "undefined") return;
		const obs = new ResizeObserver(report);
		obs.observe(el);
		return () => obs.disconnect();
	}, [onWidthChange]);

	return (
		<div
			ref={wrapperRef}
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
	useIframeDragRelay(frameDoc);

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
	// `selectedViewport` drives the iframe width via VIEWPORT_WIDTH (it's what the
	// user clicked). `actualWidth` is the iframe's real rendered width as measured
	// by ResizeObserver — for `lg` (100%) this changes when the browser resizes.
	// The toggle highlight + label both reflect the breakpoint derived from
	// actualWidth so the docs stay honest about which tier the iframe is in.
	const [selectedViewport, setSelectedViewport] = useState<Viewport>("lg");
	const [actualWidth, setActualWidth] = useState<number | undefined>(undefined);
	const activeBreakpoint =
		actualWidth !== undefined ? widthToBreakpoint(actualWidth) : selectedViewport;

	return (
		<section className="overflow-hidden rounded-xl border border-border bg-card/30">
			<header className="flex items-start justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3">
				<div className="min-w-0">
					<h3 className="text-sm font-semibold text-foreground">{title}</h3>
					{description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<span className="font-mono text-[11px] tabular-nums text-muted-foreground">
						{VIEWPORT_LABEL[activeBreakpoint]}
					</span>
					<ToggleGroup
						type="single"
						value={activeBreakpoint}
						onValueChange={(v) => v && setSelectedViewport(v as Viewport)}
						size="sm"
						variant="outline"
						aria-label="Preview viewport"
					>
						{VIEWPORTS.map((v) => (
							<ToggleGroupItem
								key={v}
								value={v}
								aria-label={VIEWPORT_LABEL[v]}
								className="px-2 font-mono text-[11px]"
							>
								{v}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
			</header>
			<div className="overflow-x-auto bg-muted/20">
				{/* Example body shrinks with the viewport toggle. Desktop = the docs
				    column (which we widened to 1400px max-w in Layout.tsx so 1024px
				    fits with room for the right TOC); tablet/mobile shrink the whole
				    card to the chosen breakpoint width. */}
				<div className="flex justify-start p-4">
					<PreviewFrame viewport={selectedViewport} onWidthChange={setActualWidth}>
						{children}
					</PreviewFrame>
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

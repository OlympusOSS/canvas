"use client";

import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "../../lib/utils";

/**
 * `react-resizable-panels` v4 emits `data-group` on the panel group and forces
 * inline `height: 100%; width: 100%`, which means a `className="h-32"` passed
 * directly to the group is ignored. The library expects the parent to size it.
 *
 * To keep `<ResizablePanelGroup className="h-32">` ergonomic for consumers, we
 * wrap the library's `Group` in a sizing container — `className` lands on that
 * wrapper, the inner `Group` then fills 100%.
 *
 * Orientation note: the library only emits `aria-orientation` on the
 * `Separator` (and the separator's orientation is OPPOSITE the group's — a
 * horizontal group has vertical separators). So group flex direction is set
 * here in JS from the prop, while separator dimension styles key off
 * `aria-orientation=horizontal` (separator inside a `vertical` group).
 */
const ResizablePanelGroup = ({
	className,
	orientation,
	style,
	...props
}: React.ComponentProps<typeof Group>) => (
	<div className={cn("flex h-full w-full", className)} style={style}>
		<Group orientation={orientation} {...props} />
	</div>
);

const ResizablePanel = Panel;

const ResizableHandle = ({
	withHandle,
	className,
	...props
}: React.ComponentProps<typeof Separator> & {
	withHandle?: boolean;
}) => (
	<Separator
		className={cn(
			"relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90",
			className,
		)}
		{...props}
	>
		{withHandle && (
			<div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
				<GripVertical className="h-2.5 w-2.5" />
			</div>
		)}
	</Separator>
);

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

// molecules: can import tokens/, lib/utils, atoms/.
import * as React from "react";

import { cn } from "../../lib/utils";

export interface TerminalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	/**
	 * Optional label rendered in the macOS-style chrome strip, next to the
	 * traffic-light dots. Typical use: a working directory + command
	 * (e.g. `~/Olympus · octl`).
	 */
	title?: React.ReactNode;
	/**
	 * Terminal body. Renders inside a `<pre>` with mono font and 1.7 line
	 * height. Free-form — drop plain text, ANSI-coloured `<span>`s, or any
	 * inline highlights you want.
	 */
	children: React.ReactNode;
	className?: string;
}

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
	({ title, children, className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"overflow-hidden rounded-xl border border-border shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]",
				className,
			)}
			style={{ background: "#0a0a0b" }}
			{...props}
		>
			<div
				className="flex items-center gap-1.5 px-3"
				style={{
					height: 32,
					background: "#141417",
					borderBottom: "1px solid #222",
				}}
			>
				<span
					aria-hidden="true"
					className="inline-block h-2.5 w-2.5 rounded-full"
					style={{ background: "#ff5f57" }}
				/>
				<span
					aria-hidden="true"
					className="inline-block h-2.5 w-2.5 rounded-full"
					style={{ background: "#febc2e" }}
				/>
				<span
					aria-hidden="true"
					className="inline-block h-2.5 w-2.5 rounded-full"
					style={{ background: "#28c840" }}
				/>
				{title != null && (
					<span className="ml-2.5 font-mono text-[11px]" style={{ color: "#6b7280" }}>
						{title}
					</span>
				)}
			</div>
			<pre
				className="m-0 overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.7]"
				style={{ color: "#e4e4e7" }}
			>
				{children}
			</pre>
		</div>
	),
);
Terminal.displayName = "Terminal";

export { Terminal };

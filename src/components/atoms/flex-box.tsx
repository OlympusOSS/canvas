import * as React from "react";

import { cn } from "../../lib/utils";

export interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Maps to `flex-direction`.
	 * @default "row"
	 */
	direction?: "row" | "column";
	/**
	 * Maps to `align-items`.
	 * @default "flex-start"
	 */
	align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
	/**
	 * Maps to `justify-content`.
	 * @default "flex-start"
	 */
	justify?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	/** Tailwind gap step (0–6) or a raw CSS value. */
	gap?: number | string;
	/**
	 * Maps to `flex-wrap`. Pass `true` for `flex-wrap`, `false` for
	 * `flex-nowrap`.
	 * @default false
	 */
	wrap?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const DIRECTION: Record<NonNullable<FlexBoxProps["direction"]>, string> = {
	row: "flex-row",
	column: "flex-col",
};

const ALIGN: Record<NonNullable<FlexBoxProps["align"]>, string> = {
	"flex-start": "items-start",
	center: "items-center",
	"flex-end": "items-end",
	stretch: "items-stretch",
	baseline: "items-baseline",
};

const JUSTIFY: Record<NonNullable<FlexBoxProps["justify"]>, string> = {
	"flex-start": "justify-start",
	center: "justify-center",
	"flex-end": "justify-end",
	"space-between": "justify-between",
	"space-around": "justify-around",
	"space-evenly": "justify-evenly",
};

const GAP: Record<number, string> = {
	0: "gap-0",
	1: "gap-2",
	2: "gap-4",
	3: "gap-6",
	4: "gap-8",
	5: "gap-10",
	6: "gap-12",
};

export const FlexBox = React.forwardRef<HTMLDivElement, FlexBoxProps>(
	(
		{
			direction = "row",
			align = "flex-start",
			justify = "flex-start",
			gap,
			wrap = false,
			className,
			style,
			...rest
		},
		ref,
	) => {
		const gapClass = typeof gap === "number" ? (GAP[gap] ?? "") : "";
		const gapStyle = typeof gap === "string" ? { gap } : undefined;
		return (
			<div
				ref={ref}
				className={cn(
					"flex",
					DIRECTION[direction],
					ALIGN[align],
					JUSTIFY[justify],
					gapClass,
					wrap && "flex-wrap",
					className,
				)}
				style={gapStyle ? { ...gapStyle, ...style } : style}
				{...rest}
			/>
		);
	},
);
FlexBox.displayName = "FlexBox";

"use client";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { type DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../atoms/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
	/**
	 * Variant applied to the prev/next month nav buttons. Maps to the
	 * `Button` atom's variants.
	 * @default "ghost"
	 */
	buttonVariant?: React.ComponentProps<typeof Button>["variant"];
	/**
	 * Show days from the previous/next month as faded entries to fill the
	 * grid.
	 * @default true
	 */
	showOutsideDays?: boolean;
	/**
	 * How the month/year heading renders. `label` is plain text, the
	 * dropdown variants render selectable controls.
	 * @default "label"
	 */
	captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
	className?: string;
};

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	formatters,
	components,
	...props
}: CalendarProps) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"bg-background group/calendar p-4 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("w-fit", defaultClassNames.root),
				months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
				month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
				nav: cn(
					"absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
					defaultClassNames.nav,
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"h-[var(--cell-size)] w-[var(--cell-size)] select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_previous,
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"h-[var(--cell-size)] w-[var(--cell-size)] select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_next,
				),
				month_caption: cn(
					"flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
					defaultClassNames.month_caption,
				),
				dropdowns: cn(
					"flex h-[var(--cell-size)] w-full items-center justify-center gap-1.5 text-sm font-medium",
					defaultClassNames.dropdowns,
				),
				dropdown_root: cn(
					"has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
					defaultClassNames.dropdown_root,
				),
				dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
				caption_label: cn(
					"select-none font-semibold tracking-tight text-foreground",
					captionLayout === "label"
						? "text-sm"
						: "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
					defaultClassNames.caption_label,
				),
				table: "w-full border-collapse",
				weekdays: cn("flex border-b border-border pb-1.5", defaultClassNames.weekdays),
				weekday: cn(
					"text-muted-foreground flex-1 select-none rounded-md text-[0.7rem] font-medium uppercase tracking-wider",
					defaultClassNames.weekday,
				),
				week: cn("mt-1.5 flex w-full", defaultClassNames.week),
				week_number_header: cn(
					"w-[var(--cell-size)] select-none",
					defaultClassNames.week_number_header,
				),
				week_number: cn(
					"text-muted-foreground select-none text-[0.8rem]",
					defaultClassNames.week_number,
				),
				day: cn(
					"group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
					defaultClassNames.day,
				),
				range_start: cn("bg-brand/10 rounded-l-md", defaultClassNames.range_start),
				range_middle: cn("bg-brand/10 rounded-none", defaultClassNames.range_middle),
				range_end: cn("bg-brand/10 rounded-r-md", defaultClassNames.range_end),
				today: cn(
					"text-brand font-semibold data-[selected=true]:rounded-none",
					defaultClassNames.today,
				),
				outside: cn(
					"text-muted-foreground/50 aria-selected:text-muted-foreground",
					defaultClassNames.outside,
				),
				disabled: cn("text-muted-foreground opacity-40", defaultClassNames.disabled),
				hidden: cn("invisible", defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => {
					return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
					}

					if (orientation === "right") {
						return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
					}

					return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props}>
							<div className="flex size-[var(--cell-size)] items-center justify-center text-center">
								{children}
							</div>
						</td>
					);
				},
				...components,
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>) {
	const defaultClassNames = getDefaultClassNames();

	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				// base size + typography (small inner inset so adjacent dates breathe)
				"m-0.5 flex aspect-square h-auto w-[calc(100%-0.25rem)] min-w-[calc(var(--cell-size)-0.25rem)] items-center justify-center rounded-md text-sm font-normal leading-none transition-colors",
				// hover (when not selected)
				"hover:bg-accent hover:text-accent-foreground",
				// today: keep brand text colour from row classNames; add subtle ring
				"group-[[data-today=true]]/day:ring-1 group-[[data-today=true]]/day:ring-brand/40",
				// single selection: brand fill, white text, full rounding
				"data-[selected-single=true]:bg-brand data-[selected-single=true]:text-brand-foreground data-[selected-single=true]:hover:bg-brand/90 data-[selected-single=true]:hover:text-brand-foreground",
				// range endpoints: brand fill, only outer corners rounded
				"data-[range-start=true]:bg-brand data-[range-start=true]:text-brand-foreground data-[range-start=true]:hover:bg-brand/90 data-[range-start=true]:hover:text-brand-foreground data-[range-start=true]:rounded-r-none",
				"data-[range-end=true]:bg-brand data-[range-end=true]:text-brand-foreground data-[range-end=true]:hover:bg-brand/90 data-[range-end=true]:hover:text-brand-foreground data-[range-end=true]:rounded-l-none",
				// range middle: foreground stays default, no rounding
				"data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-foreground data-[range-middle=true]:rounded-none",
				// focus ring (for keyboard nav)
				"group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-brand/40 group-data-[focused=true]/day:border-brand",
				// modifier label (e.g. holidays) sub-line
				"[&>span]:text-xs [&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };

"use client";

import React from "react";
import { Separator } from "../ui/separator";
import { FieldDisplay, type FieldDisplayProps } from "./field-display";
import { cn } from "../../lib/utils";

export interface DataListProps {
	items: Array<Omit<FieldDisplayProps, "orientation">>;
	orientation?: "horizontal" | "vertical";
	dividers?: boolean;
	spacing?: number;
	className?: string;
}

export function DataList({
	items,
	orientation = "vertical",
	dividers = false,
	spacing = 2,
	className,
}: DataListProps) {
	return (
		<div className={cn("flex flex-col", `gap-${spacing}`, className)}>
			{items.map((item, index) => (
				<React.Fragment key={item.label}>
					<FieldDisplay {...item} orientation={orientation} />
					{dividers && index < items.length - 1 && <Separator />}
				</React.Fragment>
			))}
		</div>
	);
}

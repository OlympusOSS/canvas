"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataList } from "./data-list";
import type { FieldDisplayProps } from "./field-display";
import { cn } from "../../lib/utils";

export interface InfoPanelProps {
	title: string;
	items: Array<Omit<FieldDisplayProps, "orientation">>;
	actions?: ReactNode;
	columns?: 1 | 2 | 3;
	className?: string;
}

function splitIntoColumns<T>(items: T[], columns: number): T[][] {
	const result: T[][] = Array.from({ length: columns }, () => []);
	items.forEach((item, index) => {
		result[index % columns].push(item);
	});
	return result;
}

export function InfoPanel({
	title,
	items,
	actions,
	columns = 1,
	className,
}: InfoPanelProps) {
	const columnedItems = columns > 1 ? splitIntoColumns(items, columns) : [items];

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{actions && <div className="flex items-center gap-2">{actions}</div>}
			</CardHeader>
			<CardContent>
				{columns > 1 ? (
					<div className={cn("grid gap-6", columns === 2 && "grid-cols-2", columns === 3 && "grid-cols-3")}>
						{columnedItems.map((columnItems, index) => (
							<DataList key={index} items={columnItems} spacing={2} />
						))}
					</div>
				) : (
					<DataList items={items} spacing={2} />
				)}
			</CardContent>
		</Card>
	);
}

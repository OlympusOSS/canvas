"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

interface ChartCardProps {
	title: string;
	children: ReactNode;
	className?: string;
}

export function ChartCard({ title, children, className }: ChartCardProps) {
	return (
		<Card className={cn("h-full pt-0", className)}>
			<CardHeader className="px-4 pt-4 pb-0" style={{ height: "fit-content", flexShrink: 0 }}>
				<CardTitle className="text-sm tracking-tight">{title}</CardTitle>
			</CardHeader>
			<CardContent className="relative flex-1 min-h-0">
				<div className="absolute inset-0">{children}</div>
			</CardContent>
		</Card>
	);
}

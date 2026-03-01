"use client";

import { type ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Icon } from "../icon";
import { cn } from "../../lib/utils";

export interface WidgetOption {
	id: string;
	title: string;
	description: string;
	icon: ReactNode;
	category: string;
}

export interface AddWidgetDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	availableWidgets: WidgetOption[];
	onAddWidget: (widgetId: string) => void;
}

export function AddWidgetDialog({
	open,
	onOpenChange,
	availableWidgets,
	onAddWidget,
}: AddWidgetDialogProps) {
	const grouped = useMemo(() => {
		const groups: Record<string, WidgetOption[]> = {};
		for (const widget of availableWidgets) {
			const cat = widget.category || "Other";
			if (!groups[cat]) groups[cat] = [];
			groups[cat].push(widget);
		}
		return groups;
	}, [availableWidgets]);

	const categoryOrder = ["stat", "chart"];
	const categoryLabels: Record<string, string> = {
		stat: "Statistics",
		chart: "Charts",
	};

	const sortedCategories = Object.keys(grouped).sort((a, b) => {
		const ai = categoryOrder.indexOf(a);
		const bi = categoryOrder.indexOf(b);
		return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Add Widget</DialogTitle>
					<DialogDescription>
						Choose widgets to add back to your dashboard.
					</DialogDescription>
				</DialogHeader>

				{availableWidgets.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-8 text-center">
						<Icon name="grid" className="mb-2 h-8 w-8 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">
							All widgets are already on your dashboard.
						</p>
					</div>
				) : (
					<div className="max-h-[400px] space-y-4 overflow-y-auto pr-1">
						{sortedCategories.map((category) => (
							<div key={category}>
								<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									{categoryLabels[category] || category}
								</h4>
								<div className="space-y-2">
									{grouped[category].map((widget, idx) => (
										<motion.div
											key={widget.id}
											initial={{ opacity: 0, y: 8 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.03, duration: 0.2 }}
											className="flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:border-border hover:bg-muted/30"
										>
											<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
												{widget.icon}
											</div>
											<div className="min-w-0 flex-1">
												<p className="text-sm font-medium text-foreground">
													{widget.title}
												</p>
												<p className="truncate text-xs text-muted-foreground">
													{widget.description}
												</p>
											</div>
											<Button
												variant="outline"
												size="sm"
												onClick={() => onAddWidget(widget.id)}
											>
												<Icon name="add" className="mr-1 h-3 w-3" />
												Add
											</Button>
										</motion.div>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

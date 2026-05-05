"use client";

import type * as React from "react";

import { cn } from "../../lib/utils";
import { Icon } from "../atoms/icon";

export type StepStatus = "pending" | "active" | "complete" | "error";

export interface StepperStep {
	id: string;
	label: string;
	status: StepStatus;
	/** Optional icon override (atoms/icon IconName or React node). */
	icon?: React.ReactNode;
	disabled?: boolean;
}

export interface StepperProps {
	steps: StepperStep[];
	orientation?: "horizontal" | "vertical";
	onStepClick?: (id: string) => void;
	className?: string;
}

const STATUS_STYLES: Record<StepStatus, { dot: string; label: string }> = {
	pending: {
		dot: "border-muted-foreground/30 text-muted-foreground",
		label: "text-muted-foreground",
	},
	active: {
		dot: "border-primary bg-primary text-primary-foreground",
		label: "text-foreground font-medium",
	},
	complete: {
		dot: "border-green-500 bg-green-500 text-white",
		label: "text-foreground",
	},
	error: {
		dot: "border-destructive bg-destructive text-destructive-foreground",
		label: "text-destructive",
	},
};

export function Stepper({ steps, orientation = "vertical", onStepClick, className }: StepperProps) {
	const vertical = orientation === "vertical";
	return (
		<ol
			className={cn("flex", vertical ? "flex-col gap-1" : "flex-row items-center gap-2", className)}
		>
			{steps.map((step, i) => {
				const styles = STATUS_STYLES[step.status];
				const clickable = !!onStepClick && !step.disabled;
				return (
					<li key={step.id} className={cn("flex items-center gap-3", vertical ? "py-2" : "flex-1")}>
						<button
							type="button"
							disabled={!clickable}
							onClick={() => clickable && onStepClick(step.id)}
							className={cn(
								"flex items-center gap-3 rounded-md transition-colors",
								vertical && "w-full px-2 py-1 text-left",
								clickable && "hover:bg-accent/50",
							)}
						>
							<span
								className={cn(
									"flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs",
									styles.dot,
								)}
							>
								{step.icon ? (
									typeof step.icon === "string" ? (
										<Icon name={step.icon as never} className="h-3.5 w-3.5" />
									) : (
										step.icon
									)
								) : step.status === "complete" ? (
									<Icon name="Check" className="h-3.5 w-3.5" />
								) : step.status === "error" ? (
									<Icon name="X" className="h-3.5 w-3.5" />
								) : (
									i + 1
								)}
							</span>
							<span className={cn("text-sm", styles.label)}>{step.label}</span>
						</button>
						{!vertical && i < steps.length - 1 && <span className="mx-2 h-px flex-1 bg-border" />}
					</li>
				);
			})}
		</ol>
	);
}

Stepper.displayName = "Stepper";

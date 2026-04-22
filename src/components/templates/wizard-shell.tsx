"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Icon } from "../atoms/icon";
import { Stepper, type StepperStep } from "../molecules/stepper";

export interface WizardShellProps {
	/** Step list shown in the left nav. */
	steps: StepperStep[];
	/** Currently active step id. */
	activeStep: string;
	onStepChange?: (id: string) => void;
	/** Optional header content inside the sidebar (logo, app name). */
	sidebarHeader?: React.ReactNode;
	/** Optional extra nav content below the step list (links, destroy button). */
	sidebarFooter?: React.ReactNode;
	/**
	 * Optional collapsible terminal panel shown at the bottom of the content
	 * area. When provided, a toggle bar is rendered.
	 */
	terminal?: React.ReactNode;
	/** Default terminal open state. Default `true`. */
	defaultTerminalOpen?: boolean;
	/** Optional ActionBar slot pinned below main content. */
	footer?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	/** Extra className for the outer flex row (e.g. "mcp-shimmer"). */
	shellClassName?: string;
}

export function WizardShell({
	steps,
	activeStep,
	onStepChange,
	sidebarHeader,
	sidebarFooter,
	terminal,
	defaultTerminalOpen = true,
	footer,
	children,
	className,
	shellClassName,
}: WizardShellProps) {
	const [termOpen, setTermOpen] = React.useState(defaultTerminalOpen);

	// Convert steps so the active one gets `status: "active"` if not already set.
	const renderedSteps = React.useMemo(
		() =>
			steps.map((s) =>
				s.id === activeStep && s.status === "pending" ? { ...s, status: "active" as const } : s,
			),
		[steps, activeStep],
	);

	return (
		<div className={cn("flex h-screen", shellClassName)}>
			<nav className={cn("w-64 shrink-0 border-r flex flex-col", className)}>
				{sidebarHeader && <div className="p-5 border-b">{sidebarHeader}</div>}
				<div className="flex-1 overflow-y-auto py-2">
					<Stepper
						steps={renderedSteps}
						orientation="vertical"
						onStepClick={onStepChange}
						className="px-2"
					/>
				</div>
				{sidebarFooter && (
					<div className="border-t border-border px-3 py-2 space-y-0.5">{sidebarFooter}</div>
				)}
			</nav>

			<div className="flex-1 flex flex-col min-w-0">
				<main className="flex-1 overflow-y-auto p-8">
					<div className="mx-auto max-w-2xl">{children}</div>
				</main>

				{footer && <div className="border-t px-8 py-3">{footer}</div>}

				{terminal && (
					<div className="shrink-0" style={{ background: "#0d1117" }}>
						<button
							type="button"
							onClick={() => setTermOpen((v) => !v)}
							className="w-full flex items-center gap-2 px-4 py-1.5 text-xs border-t"
							style={{ background: "#161b22", color: "#8b949e", borderColor: "#30363d" }}
						>
							<Icon name="Monitor" className="h-3.5 w-3.5" />
							<span className="font-mono font-medium text-[11px]">Output</span>
							<span className="ml-auto">
								{termOpen ? (
									<Icon name="ChevronDown" className="h-3 w-3" />
								) : (
									<Icon name="ChevronRight" className="h-3 w-3" />
								)}
							</span>
						</button>
						{termOpen && (
							<div className="h-48" style={{ background: "#0d1117", padding: "0 10px" }}>
								{terminal}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

WizardShell.displayName = "WizardShell";

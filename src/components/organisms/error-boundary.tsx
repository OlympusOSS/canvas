"use client";

import * as React from "react";

import { Button } from "../atoms/button";
import { Icon } from "../atoms/icon";

export interface ErrorBoundaryProps {
	children: React.ReactNode;
	/** Custom fallback — receives the error and a reset function. */
	fallback?: (error: Error, reset: () => void) => React.ReactNode;
	/** Called when an error is captured. Useful for error reporting. */
	onError?: (error: Error, info: React.ErrorInfo) => void;
	/** Label for the built-in reset button (ignored when `fallback` is provided). */
	resetLabel?: string;
}

interface State {
	error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	static displayName = "ErrorBoundary";

	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		this.props.onError?.(error, info);
	}

	reset = () => this.setState({ error: null });

	render() {
		const { error } = this.state;
		if (!error) return this.props.children;

		if (this.props.fallback) return this.props.fallback(error, this.reset);

		return (
			<div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
				<Icon name="TriangleAlert" className="h-10 w-10 text-destructive" />
				<h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
				<p className="max-w-md text-sm text-muted-foreground">
					{error.message || "An unexpected error occurred."}
				</p>
				{error.stack && (
					<pre className="max-h-40 max-w-lg overflow-auto whitespace-pre-wrap text-left text-xs text-muted-foreground/60">
						{error.stack}
					</pre>
				)}
				<Button onClick={this.reset} size="sm">
					{this.props.resetLabel ?? "Try again"}
				</Button>
			</div>
		);
	}
}

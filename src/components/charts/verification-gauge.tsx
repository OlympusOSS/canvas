"use client";

import { useEffect, useRef } from "react";

interface VerificationGaugeProps {
	value: number;
	size?: number;
	strokeWidth?: number;
	label?: string;
}

export function VerificationGauge({
	value,
	size = 220,
	strokeWidth = 14,
	label,
}: VerificationGaugeProps) {
	const ref = useRef<SVGSVGElement>(null);

	// Arc geometry — 220-degree arc (from -110 to +110)
	const startAngle = -110;
	const endAngle = 110;
	const totalAngle = endAngle - startAngle; // 220 degrees

	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const arcLength = (totalAngle / 360) * circumference;

	// SVG arc path helpers
	const cx = size / 2;
	const cy = size / 2;

	const polarToCartesian = (angle: number) => {
		const radians = ((angle - 90) * Math.PI) / 180;
		return {
			x: cx + radius * Math.cos(radians),
			y: cy + radius * Math.sin(radians),
		};
	};

	const start = polarToCartesian(startAngle);
	const end = polarToCartesian(endAngle);
	const largeArcFlag = totalAngle > 180 ? 1 : 0;

	const pathD = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;

	const valueDashOffset = arcLength - (Math.min(100, value) / 100) * arcLength;

	return (
		<div className="relative flex h-full min-h-0 flex-col items-center justify-center overflow-hidden">
			<div className="relative w-full max-w-[300px] max-h-full aspect-square shrink-0" style={{ maxHeight: 'calc(100% - 1.25rem)' }}>
				<svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
					{/* Track */}
					<path
						d={pathD}
						fill="none"
						stroke="currentColor"
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						className="text-muted/30"
					/>

					{/* Value arc */}
					<path
						d={pathD}
						fill="none"
						stroke="currentColor"
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeDasharray={arcLength}
						strokeDashoffset={valueDashOffset}
						className="text-primary transition-all duration-1000 ease-out"
					/>
				</svg>

				{/* Center label */}
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-3xl font-bold text-foreground">
						{Math.round(value)}%
					</span>
				</div>
			</div>

			{label && (
				<p className="-mt-4 text-center text-xs text-muted-foreground">
					{label}
				</p>
			)}
		</div>
	);
}

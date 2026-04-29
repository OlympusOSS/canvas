import { BrandLockup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[160px] flex-col items-center justify-center gap-4 p-8">
			<BrandLockup productName="Athena" size="sm" collapsed />
			<span className="text-[11px] text-muted-foreground">
				Pair with `size=&quot;sm&quot;` for sidebar-collapsed brand peek.
			</span>
		</div>
	);
}

import { Terminal } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Terminal title="~/Olympus · octl" className="w-full max-w-lg">
				{"$ octl\n\n✓ kratos      "}
				<span style={{ color: "#86efac" }}>healthy</span>
				{"\n✓ hydra       "}
				<span style={{ color: "#86efac" }}>healthy</span>
				{"\n✓ hera        → http://localhost:3000\n\ntest user → "}
				<span style={{ color: "#a5b4fc" }}>admin@olympus.local</span>
				{" / olympus"}
			</Terminal>
		</div>
	);
}

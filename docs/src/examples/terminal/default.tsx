import { Terminal } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Terminal title="~/Olympus · octl" className="w-full max-w-lg">
				{`$ npm install -g @olympusoss/octl
$ octl

→ checking Podman, podman-compose, kubectl…
→ building dev images
→ bringing up stack`}
			</Terminal>
		</div>
	);
}

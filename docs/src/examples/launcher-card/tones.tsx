import { LauncherCard, type LauncherCardTone } from "@olympusoss/canvas";

const TILES: { badge: string; tone: LauncherCardTone; title: string; description: string }[] = [
	{
		badge: "C",
		tone: "indigo",
		title: "Customer login (CIAM)",
		description: "End-user identity domain.",
	},
	{
		badge: "E",
		tone: "violet",
		title: "Employee login (IAM)",
		description: "Workforce identity domain.",
	},
	{
		badge: "A",
		tone: "slate",
		title: "Admin · Customer identity",
		description: "Athena admin for the CIAM domain.",
	},
	{
		badge: "P",
		tone: "default",
		title: "Default tone",
		description: "Uses the --primary token for the badge.",
	},
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
				{TILES.map((tile) => (
					<LauncherCard
						key={tile.badge + tile.tone}
						badge={tile.badge}
						tone={tile.tone}
						title={tile.title}
						description={tile.description}
						href="#"
					/>
				))}
			</div>
		</div>
	);
}

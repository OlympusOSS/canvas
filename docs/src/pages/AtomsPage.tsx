import {
	Avatar,
	AvatarFallback,
	Badge,
	Button,
	Checkbox,
	FlexBox,
	Icon,
	Input,
	Label,
	OlympusLogo,
	Progress,
	Section,
	Separator,
	Skeleton,
	Switch,
	Textarea,
} from "@olympusoss/canvas";
import { Showcase } from "../Showcase";

export function AtomsPage() {
	return (
		<Section spacing={4}>
			<Showcase title="Button" description="Default + variants.">
				<Button>Default</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Destructive</Button>
				<Button disabled>Disabled</Button>
			</Showcase>

			<Showcase title="Input / Label / Textarea">
				<div className="w-64 space-y-2">
					<Label htmlFor="eg-email">Email</Label>
					<Input id="eg-email" type="email" placeholder="you@example.com" />
				</div>
				<div className="w-64 space-y-2">
					<Label htmlFor="eg-note">Note</Label>
					<Textarea id="eg-note" rows={3} placeholder="Type here…" />
				</div>
			</Showcase>

			<Showcase title="Checkbox / Switch">
				<Label className="flex items-center gap-2">
					<Checkbox defaultChecked /> Enable feature
				</Label>
				<Label className="flex items-center gap-2">
					<Switch defaultChecked /> Dark mode
				</Label>
			</Showcase>

			<Showcase title="Badge" description="status variants.">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="destructive">Destructive</Badge>
			</Showcase>

			<Showcase title="Avatar">
				<Avatar className="h-10 w-10">
					<AvatarFallback>OK</AvatarFallback>
				</Avatar>
			</Showcase>

			<Showcase title="Icon" description="Lucide icons via Canvas.">
				<Icon name="Check" />
				<Icon name="CircleCheck" className="text-green-500" />
				<Icon name="CircleX" className="text-destructive" />
				<Icon name="LoaderCircle" className="animate-spin" />
				<Icon name="TriangleAlert" className="text-amber-500" />
			</Showcase>

			<Showcase title="OlympusLogo" description="icon (default) + ring variants.">
				<OlympusLogo size={32} />
				<OlympusLogo variant="ring" className="h-12 w-auto text-primary" />
				<OlympusLogo showText size={20} />
			</Showcase>

			<Showcase title="Progress / Skeleton / Separator">
				<div className="w-64 space-y-3">
					<Progress value={60} />
					<Skeleton className="h-6 w-40" />
					<Separator />
				</div>
			</Showcase>

			<Showcase title="FlexBox" description="Layout utility wrapping flexbox.">
				<FlexBox direction="row" gap={2} className="rounded border border-border p-2">
					<Button size="sm">A</Button>
					<Button size="sm" variant="outline">
						B
					</Button>
					<Button size="sm" variant="ghost">
						C
					</Button>
				</FlexBox>
			</Showcase>
		</Section>
	);
}

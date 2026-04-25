import { lazy, type ReactNode } from "react";

export interface ExampleContent {
	id: string;
	title: string;
	description?: string;
	filename?: string;
	render: () => ReactNode;
	source: string;
}

export interface ComponentContent {
	id: string;
	tier: "atoms" | "molecules" | "organisms" | "templates";
	displayName: string;
	overview: string;
	importLine: string;
	examples?: ExampleContent[];
	playground?: () => ReactNode;
	a11y?: string[];
	tokens?: string[];
	/** Source identifier used to look up extracted props in generated.json */
	propsSource: string;
}

const ButtonDefault = lazy(() => import("../examples/button/default"));
const ButtonVariants = lazy(() => import("../examples/button/variants"));
const ButtonSizes = lazy(() => import("../examples/button/sizes"));

import buttonDefaultSource from "../examples/button/default?raw";
import buttonSizesSource from "../examples/button/sizes?raw";
import buttonVariantsSource from "../examples/button/variants?raw";

const BadgeVariants = lazy(() => import("../examples/badge/variants"));

import badgeVariantsSource from "../examples/badge/variants?raw";

const InputDefault = lazy(() => import("../examples/input/default"));

import inputDefaultSource from "../examples/input/default?raw";

const CardDefault = lazy(() => import("../examples/card/default"));

import { Button, type ButtonProps } from "@olympusoss/canvas";
import { ComponentPlayground } from "../components/ComponentPlayground";
import cardDefaultSource from "../examples/card/default?raw";

type ButtonVariant = NonNullable<ButtonProps["variant"]>;
type ButtonSize = NonNullable<ButtonProps["size"]>;

const BUTTON_PLAYGROUND = () => (
	<ComponentPlayground
		controls={[
			{
				type: "select",
				name: "variant",
				options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
				defaultValue: "default",
			},
			{
				type: "select",
				name: "size",
				options: ["default", "sm", "lg"],
				defaultValue: "default",
			},
			{ type: "switch", name: "disabled", defaultValue: false },
		]}
		render={(state) => (
			<Button
				variant={state.variant as ButtonVariant}
				size={state.size as ButtonSize}
				disabled={state.disabled as boolean}
			>
				Button
			</Button>
		)}
	/>
);

export const COMPONENT_CONTENT: Record<string, ComponentContent> = {
	button: {
		id: "button",
		tier: "atoms",
		displayName: "Button",
		propsSource: "atoms/button",
		importLine: `import { Button } from "@olympusoss/canvas";`,
		overview:
			"The primary action atom. Six variants (default, destructive, outline, secondary, ghost, link) and three sizes (default, sm, lg) plus an icon size. Wraps a Radix Slot when `asChild` is true so you can render any element with button styling — typically a Next.js Link.",
		a11y: [
			"Use `aria-label` on icon-only buttons (size='icon').",
			"focus-visible adds a 1px ring; do not remove.",
			"Disabled state is not focusable; prefer aria-disabled with onClick guard if you need keyboard reachability.",
		],
		tokens: [
			"--primary",
			"--primary-foreground",
			"--secondary",
			"--accent",
			"--destructive",
			"--ring",
			"--radius",
		],
		playground: BUTTON_PLAYGROUND,
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <ButtonDefault />,
				source: buttonDefaultSource,
				filename: "Button.tsx",
			},
			{
				id: "variants",
				title: "Variants",
				description: "Six variants for different action emphasis.",
				render: () => <ButtonVariants />,
				source: buttonVariantsSource,
				filename: "Button.tsx",
			},
			{
				id: "sizes",
				title: "Sizes",
				description: "sm / default / lg, plus an icon-only size.",
				render: () => <ButtonSizes />,
				source: buttonSizesSource,
				filename: "Button.tsx",
			},
		],
	},
	badge: {
		id: "badge",
		tier: "atoms",
		displayName: "Badge",
		propsSource: "atoms/badge",
		importLine: `import { Badge } from "@olympusoss/canvas";`,
		overview:
			"Small inline-flex pill for status, counts, and tags. Four variants (default, secondary, outline, destructive). Pair with a leading dot for status indicators.",
		tokens: ["--primary", "--secondary", "--accent", "--destructive", "--border"],
		examples: [
			{
				id: "variants",
				title: "Variants",
				render: () => <BadgeVariants />,
				source: badgeVariantsSource,
				filename: "Badge.tsx",
			},
		],
	},
	input: {
		id: "input",
		tier: "atoms",
		displayName: "Input",
		propsSource: "atoms/input",
		importLine: `import { Input, Label } from "@olympusoss/canvas";`,
		overview:
			"Text input atom. Always pair with a `<Label>` for a11y. Supports every standard `<input>` HTML attribute via prop spread.",
		a11y: [
			"Every input must have an associated label (`htmlFor`/`id` or wrapping Label).",
			"Use `aria-invalid` to signal validation state to screen readers.",
		],
		tokens: ["--input", "--background", "--foreground", "--ring"],
		examples: [
			{
				id: "default",
				title: "Default",
				render: () => <InputDefault />,
				source: inputDefaultSource,
				filename: "Input.tsx",
			},
		],
	},
	"auth-layout": {
		id: "auth-layout",
		tier: "templates",
		displayName: "AuthLayout",
		propsSource: "templates/auth-layout",
		importLine: `import { AuthLayout } from "@olympusoss/canvas";`,
		overview:
			"⚠️ DEPRECATED — use AuthShell instead. AuthLayout is the v1 centered-card auth scaffold; it remains exported as a backwards-compatibility alias and will be removed in canvas v3.0.",
		tokens: [],
	},
	card: {
		id: "card",
		tier: "molecules",
		displayName: "Card",
		propsSource: "molecules/card",
		importLine: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@olympusoss/canvas";`,
		overview:
			"Compound molecule. Use Card + CardHeader (with CardTitle / CardDescription) + CardContent + CardFooter to compose a self-contained surface.",
		tokens: ["--card", "--card-foreground", "--border", "--radius"],
		examples: [
			{
				id: "default",
				title: "With header, content, and footer",
				render: () => <CardDefault />,
				source: cardDefaultSource,
				filename: "Card.tsx",
			},
		],
	},
};

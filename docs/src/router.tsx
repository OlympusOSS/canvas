import type { RouteObject } from "react-router-dom";
import { Changelog } from "./routes/Changelog";
import { ComponentPage } from "./routes/components/ComponentPage";
import { TierIndex } from "./routes/components/TierIndex";
import { Home } from "./routes/Home";
import { Install } from "./routes/Install";
import { Layout } from "./routes/Layout";
import { Migration } from "./routes/Migration";
import { NotFound } from "./routes/NotFound";
import { Principles } from "./routes/Principles";
import { TokensAnimation } from "./routes/tokens/Animation";
import { TokensBrand } from "./routes/tokens/Brand";
import { TokensColors } from "./routes/tokens/Colors";
import { TokensIcons } from "./routes/tokens/Icons";
import { TokensLayout } from "./routes/tokens/Layout";
import { TokensRadii } from "./routes/tokens/Radii";
import { TokensShadows } from "./routes/tokens/Shadows";
import { TokensSpacing } from "./routes/tokens/Spacing";
import { TokensTypography } from "./routes/tokens/Typography";

export const router: RouteObject[] = [
	{
		path: "/",
		Component: Layout,
		children: [
			{ index: true, Component: Home },
			{ path: "install", Component: Install },
			{ path: "principles", Component: Principles },
			{ path: "migration", Component: Migration },
			{ path: "changelog", Component: Changelog },
			{
				path: "tokens",
				Component: TokensLayout,
				children: [
					{ index: true, Component: TokensColors },
					{ path: "colors", Component: TokensColors },
					{ path: "typography", Component: TokensTypography },
					{ path: "spacing", Component: TokensSpacing },
					{ path: "radii", Component: TokensRadii },
					{ path: "shadows", Component: TokensShadows },
					{ path: "icons", Component: TokensIcons },
					{ path: "animation", Component: TokensAnimation },
					{ path: "brand", Component: TokensBrand },
				],
			},
			{
				path: "components/:tier",
				Component: TierIndex,
			},
			{
				path: "components/:tier/:name",
				Component: ComponentPage,
			},
			{ path: "*", Component: NotFound },
		],
	},
];

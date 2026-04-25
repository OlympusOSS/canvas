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
import { Tokens } from "./routes/Tokens";

export const router: RouteObject[] = [
	{
		path: "/",
		Component: Layout,
		children: [
			{ index: true, Component: Home },
			{ path: "install", Component: Install },
			{ path: "principles", Component: Principles },
			{ path: "tokens", Component: Tokens },
			{ path: "migration", Component: Migration },
			{ path: "changelog", Component: Changelog },
			{ path: "components/:tier", Component: TierIndex },
			{ path: "components/:tier/:name", Component: ComponentPage },
			{ path: "*", Component: NotFound },
		],
	},
];

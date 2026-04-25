import { ThemeProvider, Toaster } from "@olympusoss/canvas";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CmdK } from "./components/CmdK";
import { router } from "./router";
import "./styles.css";

const browserRouter = createBrowserRouter(router, {
	basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark">
			<RouterProvider router={browserRouter} />
			<CmdK />
			<Toaster />
		</ThemeProvider>
	</StrictMode>,
);

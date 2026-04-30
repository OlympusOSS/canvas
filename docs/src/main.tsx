import { ThemeProvider, Toaster } from "@olympusoss/canvas";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles.css";
import "../../styles/leaflet.css";

const browserRouter = createBrowserRouter(router, {
	basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark">
			<RouterProvider router={browserRouter} />
			<Toaster />
		</ThemeProvider>
	</StrictMode>,
);

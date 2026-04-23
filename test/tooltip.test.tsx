import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../src/index";

describe("Tooltip", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tip text</TooltipContent>
				</Tooltip>
			</TooltipProvider>,
		);
		expect(container).toMatchSnapshot();
	});
});

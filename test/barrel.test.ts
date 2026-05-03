import { describe, expect, it } from "vitest";
import * as Canvas from "../src/index";

// Every name listed here MUST be a live export of the package barrel.
// When a component is removed or renamed, this test catches it before a
// breaking publish.
const EXPECTED_EXPORTS = [
	"cn",
	"useIsMobile",
	"Accordion",
	"AccordionContent",
	"AccordionItem",
	"AccordionTrigger",
	"Alert",
	"AlertDescription",
	"AlertTitle",
	"AlertDialog",
	"AlertDialogAction",
	"AlertDialogCancel",
	"AlertDialogContent",
	"AspectRatio",
	"Avatar",
	"AvatarFallback",
	"AvatarImage",
	"Badge",
	"badgeVariants",
	"Breadcrumb",
	"Button",
	"buttonVariants",
	"Calendar",
	"Card",
	"CardContent",
	"CardDescription",
	"CardFooter",
	"CardHeader",
	"CardTitle",
	"Carousel",
	"Checkbox",
	"Collapsible",
	"Command",
	"ContextMenu",
	"DataTable",
	"Dialog",
	"DialogContent",
	"DialogDescription",
	"DialogFooter",
	"DialogHeader",
	"DialogTitle",
	"DialogTrigger",
	"Drawer",
	"DropdownMenu",
	"EmptyState",
	"Form",
	"FormControl",
	"FormDescription",
	"FormField",
	"FormItem",
	"FormLabel",
	"FormMessage",
	"HoverCard",
	"Input",
	"InputOTP",
	"Label",
	"Menubar",
	"NavigationMenu",
	"Pagination",
	"Popover",
	"Progress",
	"RadioGroup",
	"RadioGroupItem",
	"ResizablePanelGroup",
	"ScrollArea",
	"Select",
	"Separator",
	"Sheet",
	"Sidebar",
	"Skeleton",
	"Slider",
	"StatusBadge",
	"Switch",
	"Table",
	"Tabs",
	"TabsContent",
	"TabsList",
	"TabsTrigger",
	"Textarea",
	"Toaster",
	"Toggle",
	"ToggleGroup",
	"Tooltip",
	"AppShell",
	"DashboardGrid",
];

describe("canvas barrel", () => {
	it("exports all expected names", () => {
		for (const name of EXPECTED_EXPORTS) {
			expect(Canvas, `missing export: ${name}`).toHaveProperty(name);
		}
	});

	it("every exported member is a function, object, or class (not undefined)", () => {
		for (const name of EXPECTED_EXPORTS) {
			const value = (Canvas as Record<string, unknown>)[name];
			expect(value, `${name} is undefined`).toBeDefined();
			expect(value, `${name} is null`).not.toBeNull();
		}
	});
});

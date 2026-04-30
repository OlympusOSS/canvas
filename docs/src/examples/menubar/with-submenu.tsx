import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>Format</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Bold</MenubarItem>
						<MenubarItem>Italic</MenubarItem>
						<MenubarSub>
							<MenubarSubTrigger>Heading</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem>H1</MenubarItem>
								<MenubarItem>H2</MenubarItem>
								<MenubarItem>H3</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}

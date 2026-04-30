import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="#">Docs</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<span className="text-muted-foreground">/</span>
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbLink href="#">Components</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>
						<span className="text-muted-foreground">/</span>
					</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}

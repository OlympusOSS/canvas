import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@olympusoss/canvas";

const Row = ({ size }: { size: "sm" | "default" | "lg" }) => (
	<Pagination>
		<PaginationContent>
			<PaginationItem>
				<PaginationLink href="#" size={size}>
					1
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#" size={size} isActive>
					2
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#" size={size}>
					3
				</PaginationLink>
			</PaginationItem>
		</PaginationContent>
	</Pagination>
);

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-4">
				<div>
					<p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						sm
					</p>
					<Row size="sm" />
				</div>
				<div>
					<p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						default
					</p>
					<Row size="default" />
				</div>
				<div>
					<p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						lg
					</p>
					<Row size="lg" />
				</div>
			</div>
		</div>
	);
}

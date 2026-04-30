import { DataTable } from "@olympusoss/canvas";

interface Order {
	id: string;
	number: string;
	customer: string;
	total: string;
}

const data: Order[] = Array.from({ length: 17 }, (_, i) => ({
	id: String(i + 1),
	number: `ORD-${(1000 + i).toString()}`,
	customer: ["Alice", "Bobby", "Cassie", "Diego", "Eden"][i % 5],
	total: `$${(50 + i * 12).toFixed(2)}`,
}));

export default function App() {
	return (
		<DataTable<Order>
			data={data}
			pagination
			pageSize={5}
			pageSizeOptions={[5, 10, 25]}
			columns={[
				{ field: "number", headerName: "Order" },
				{ field: "customer", headerName: "Customer" },
				{ field: "total", headerName: "Total" },
			]}
		/>
	);
}

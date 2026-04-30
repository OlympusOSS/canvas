import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
} from "@olympusoss/canvas";
import { useForm } from "react-hook-form";

export default function App() {
	const form = useForm({ defaultValues: { id: "acct_29F3xZ7wQ", email: "alice@example.com" } });
	return (
		<div className="flex min-h-[280px] items-center justify-center p-8">
			<Form {...form}>
				<form className="w-full max-w-sm space-y-3">
					<FormField
						control={form.control}
						name="id"
						disabled
						render={({ field }) => (
							<FormItem>
								<FormLabel>Account ID</FormLabel>
								<FormControl>
									<Input {...field} className="font-mono" />
								</FormControl>
								<FormDescription>Read-only — auto-generated.</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="submit">Update</Button>
				</form>
			</Form>
		</div>
	);
}

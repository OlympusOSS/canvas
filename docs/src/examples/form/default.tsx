import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@olympusoss/canvas";
import { useForm } from "react-hook-form";

interface FormValues {
	username: string;
}

export default function App() {
	const form = useForm<FormValues>({ defaultValues: { username: "" } });
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
				className="w-full max-w-sm space-y-3"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="bobby" {...field} />
							</FormControl>
							<FormDescription>Your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

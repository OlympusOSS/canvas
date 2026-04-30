import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@olympusoss/canvas";
import { useForm } from "react-hook-form";

interface FormValues {
	name: string;
	priority: string;
	notes: string;
	subscribe: boolean;
}

export default function App() {
	const form = useForm<FormValues>({
		defaultValues: { name: "", priority: "medium", notes: "", subscribe: true },
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
				className="w-full max-w-md space-y-3"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project name</FormLabel>
							<FormControl>
								<Input placeholder="Phoenix" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="priority"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="low">Low</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="high">High</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea rows={3} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="subscribe"
					render={({ field }) => (
						<FormItem className="flex items-center gap-2">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div>
								<FormLabel>Email me on changes</FormLabel>
								<FormDescription>Send a weekly digest.</FormDescription>
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
}

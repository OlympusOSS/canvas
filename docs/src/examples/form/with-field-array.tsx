import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Icon,
	Input,
	Label,
} from "@olympusoss/canvas";
import { useFieldArray, useForm } from "react-hook-form";

interface FormValues {
	tags: { value: string }[];
}

export default function App() {
	const form = useForm<FormValues>({
		defaultValues: { tags: [{ value: "feature" }] },
	});
	const { fields, append, remove } = useFieldArray({ control: form.control, name: "tags" });
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
				className="w-full max-w-md space-y-3"
			>
				<Label>Tags</Label>
				{fields.map((f, i) => (
					<FormField
						key={f.id}
						control={form.control}
						name={`tags.${i}.value`}
						render={({ field }) => (
							<FormItem className="flex items-center gap-2">
								<FormControl>
									<Input placeholder={`tag ${i + 1}`} {...field} />
								</FormControl>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label="Remove"
									onClick={() => remove(i)}
								>
									<Icon name="X" />
								</Button>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<div className="flex gap-2">
					<Button type="button" variant="outline" onClick={() => append({ value: "" })}>
						<Icon name="Plus" />
						Add tag
					</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		</Form>
	);
}

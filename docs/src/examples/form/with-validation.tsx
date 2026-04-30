import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@olympusoss/canvas";
import { useForm } from "react-hook-form";

interface FormValues {
	email: string;
	password: string;
}

export default function App() {
	const form = useForm<FormValues>({
		defaultValues: { email: "", password: "" },
		mode: "onTouched",
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
				className="w-full max-w-sm space-y-3"
			>
				<FormField
					control={form.control}
					name="email"
					rules={{
						required: "Email is required.",
						pattern: { value: /.+@.+/, message: "Enter a valid email." },
					}}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="you@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					rules={{
						required: "Password is required.",
						minLength: { value: 8, message: "Min 8 characters." },
					}}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Sign in</Button>
			</form>
		</Form>
	);
}

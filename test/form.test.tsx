import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "../src/index";

interface FormValues {
	username: string;
}

function Harness({ onSubmit }: { onSubmit?: (values: FormValues) => void }) {
	const methods = useForm<FormValues>({ defaultValues: { username: "" } });
	return (
		<Form {...methods}>
			<form
				onSubmit={methods.handleSubmit((values) => {
					onSubmit?.(values);
				})}
			>
				<FormField
					control={methods.control}
					name="username"
					rules={{ required: "Username is required" }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} placeholder="username" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<button type="submit">Submit</button>
			</form>
		</Form>
	);
}

describe("Form", () => {
	it("renders label + input through the composed primitives", () => {
		render(<Harness />);
		expect(screen.getByText("Username")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
	});

	it("shows a validation message when required value is missing on submit", async () => {
		render(<Harness />);
		fireEvent.click(screen.getByText("Submit"));
		await waitFor(() => {
			expect(screen.getByText("Username is required")).toBeInTheDocument();
		});
	});

	it("matches snapshot", () => {
		const { container } = render(<Harness />);
		expect(container).toMatchSnapshot();
	});
});

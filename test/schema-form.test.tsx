import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  SchemaForm,
  canvasSchemaFormTemplates,
  canvasSchemaFormWidgets,
  type RJSFSchema,
  type WidgetProps,
} from "../src/index";

describe("SchemaForm", () => {
  const simpleSchema: RJSFSchema = {
    type: "object",
    properties: {
      name: { type: "string", title: "Name" },
    },
  };

  it("renders a simple schema with label + input", () => {
    render(<SchemaForm schema={simpleSchema} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    // The TextWidget uses <Input /> underneath
    const inputs = document.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });

  it("bubbles user input through the onChange prop", () => {
    const onChange = vi.fn();
    render(<SchemaForm schema={simpleSchema} onChange={onChange} />);
    const input = document.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Bobby" } });
    expect(onChange).toHaveBeenCalled();
    // Latest call includes the new formData
    const latest = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(latest.formData).toEqual({ name: "Bobby" });
  });

  it("calls onSubmit with formData when the form is submitted", () => {
    const onSubmit = vi.fn();
    const { container } = render(
      <SchemaForm schema={simpleSchema} onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </SchemaForm>,
    );
    const input = document.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Bobby" } });
    const form = container.querySelector("form") as HTMLFormElement;
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();
    const arg = onSubmit.mock.calls[0][0];
    expect(arg.formData).toEqual({ name: "Bobby" });
  });

  it("custom widgets prop overrides the default TextWidget", () => {
    const StubText: React.FC<WidgetProps> = ({ id }) => (
      <div data-testid={`stub-${id}`}>STUB</div>
    );
    render(
      <SchemaForm schema={simpleSchema} widgets={{ TextWidget: StubText }} />,
    );
    expect(screen.getByText("STUB")).toBeInTheDocument();
  });

  it("exports non-empty canvasSchemaFormWidgets and canvasSchemaFormTemplates", () => {
    expect(canvasSchemaFormWidgets).toBeDefined();
    expect(Object.keys(canvasSchemaFormWidgets).length).toBeGreaterThan(0);
    expect(canvasSchemaFormWidgets.TextWidget).toBeDefined();
    expect(canvasSchemaFormWidgets.SelectWidget).toBeDefined();

    expect(canvasSchemaFormTemplates).toBeDefined();
    expect(Object.keys(canvasSchemaFormTemplates).length).toBeGreaterThan(0);
    expect(canvasSchemaFormTemplates.FieldTemplate).toBeDefined();
    expect(canvasSchemaFormTemplates.ObjectFieldTemplate).toBeDefined();
  });

  it("matches snapshot with a minimal schema", () => {
    const { container } = render(<SchemaForm schema={simpleSchema} />);
    expect(container).toMatchSnapshot();
  });
});

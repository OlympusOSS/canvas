import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../src/index";

describe("Select", () => {
  function Harness({ defaultOpen = false }: { defaultOpen?: boolean }) {
    return (
      <Select defaultOpen={defaultOpen}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton />
          <SelectGroup>
            <SelectLabel>Group</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectSeparator />
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    );
  }

  it("renders trigger with placeholder", () => {
    render(<Harness />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("renders content when defaultOpen is true", () => {
    render(<Harness defaultOpen />);
    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("supports a controlled value", () => {
    const { rerender } = render(
      <Select value="apple" onValueChange={() => {}}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("Apple")).toBeInTheDocument();

    rerender(
      <Select value="banana" onValueChange={() => {}}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("matches snapshot of the trigger", () => {
    const { container } = render(<Harness />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot of open content", () => {
    render(<Harness defaultOpen />);
    const listbox = document.querySelector("[role=listbox]");
    expect(listbox).toMatchSnapshot();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "../src/index";

describe("ButtonGroup", () => {
  it("renders grouped buttons in horizontal orientation (default)", () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });

  it("renders in vertical orientation", () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>Top</Button>
        <Button>Bottom</Button>
      </ButtonGroup>,
    );
    const group = container.querySelector('[data-slot="button-group"]');
    expect(group?.getAttribute("data-orientation")).toBe("vertical");
  });

  it("ButtonGroupSeparator renders with default vertical orientation", () => {
    const { container } = render(
      <ButtonGroup>
        <Button>A</Button>
        <ButtonGroupSeparator />
        <Button>B</Button>
      </ButtonGroup>,
    );
    const sep = container.querySelector('[data-slot="button-group-separator"]');
    expect(sep?.getAttribute("data-orientation")).toBe("vertical");
  });

  it("ButtonGroupSeparator accepts a horizontal orientation override", () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <Button>B</Button>
      </ButtonGroup>,
    );
    const sep = container.querySelector('[data-slot="button-group-separator"]');
    expect(sep?.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("ButtonGroupText renders as a div by default", () => {
    render(<ButtonGroupText>Label</ButtonGroupText>);
    const el = screen.getByText("Label");
    expect(el.tagName).toBe("DIV");
  });

  it("ButtonGroupText with asChild wraps the provided child", () => {
    render(
      <ButtonGroupText asChild>
        <span>Span label</span>
      </ButtonGroupText>,
    );
    expect(screen.getByText("Span label").tagName).toBe("SPAN");
  });

  it("buttonGroupVariants returns different class strings per orientation", () => {
    const horizontal = buttonGroupVariants({ orientation: "horizontal" });
    const vertical = buttonGroupVariants({ orientation: "vertical" });
    expect(horizontal).not.toBe(vertical);
  });

  it("matches snapshot", () => {
    const { container } = render(
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );
    expect(container).toMatchSnapshot();
  });
});

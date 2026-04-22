import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../src/index";

describe("Pagination", () => {
  it("renders a full pagination composition", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("More pages")).toBeInTheDocument();
  });

  it("PaginationLink isActive sets aria-current", () => {
    render(
      <PaginationLink href="/p/1" isActive>
        1
      </PaginationLink>,
    );
    const link = screen.getByText("1");
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("PaginationLink without isActive omits aria-current", () => {
    render(
      <PaginationLink href="/p/2" size="sm">
        2
      </PaginationLink>,
    );
    const link = screen.getByText("2");
    expect(link.getAttribute("aria-current")).toBeNull();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(container).toMatchSnapshot();
  });
});

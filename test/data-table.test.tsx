import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DataTable, type DataTableColumn } from "../src/index";

interface Row {
  id: string;
  name: string;
  role: string;
}

const rows: Row[] = [
  { id: "1", name: "Alice", role: "admin" },
  { id: "2", name: "Bob", role: "user" },
  { id: "3", name: "Carol", role: "user" },
];

describe("DataTable", () => {
  it("renders rows using the legacy column shape", () => {
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
      {
        field: "role",
        headerName: "Role",
        renderCell: (value) => <span data-testid="role-cell">{value}</span>,
      },
    ];
    render(<DataTable columns={columns} data={rows} pagination={false} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
    // renderCell path fires
    expect(screen.getAllByTestId("role-cell").length).toBe(3);
  });

  it("renders rows using the TanStack column shape", () => {
    const columns: DataTableColumn<Row>[] = [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <em data-testid="tan-cell">{row.original.role}</em>,
      },
    ];
    render(<DataTable columns={columns} data={rows} pagination={false} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getAllByTestId("tan-cell").length).toBe(3);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("renders LoadingState when loading=true (hides data)", () => {
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
    ];
    const { container } = render(
      <DataTable columns={columns} data={rows} loading pagination={false} />,
    );
    // Data rows should NOT render
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    // LoadingState is rendered in a single cell with h-24
    expect(container.querySelector(".h-24")).toBeInTheDocument();
  });

  it("shows emptyMessage when data is empty", () => {
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
    ];
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="Nothing here"
        pagination={false}
      />,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("fires onRowClick when a row is clicked", () => {
    const onRowClick = vi.fn();
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
    ];
    render(
      <DataTable
        columns={columns}
        data={rows}
        onRowClick={onRowClick}
        pagination={false}
      />,
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });

  it("selectable: clicking the header checkbox selects all rows", () => {
    const onSelectionChange = vi.fn();
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
    ];
    render(
      <DataTable
        columns={columns}
        data={rows}
        selectable
        onSelectionChange={onSelectionChange}
        pagination={false}
      />,
    );
    const headerCheckbox = screen.getByLabelText("Select all");
    fireEvent.click(headerCheckbox);
    expect(onSelectionChange).toHaveBeenCalled();
    const latest = onSelectionChange.mock.calls[
      onSelectionChange.mock.calls.length - 1
    ][0] as Set<string>;
    expect(latest.has("1")).toBe(true);
    expect(latest.has("2")).toBe(true);
    expect(latest.has("3")).toBe(true);
  });

  it("searchable: typing in the search input fires onSearchChange", () => {
    const onSearchChange = vi.fn();
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
    ];
    render(
      <DataTable
        columns={columns}
        data={rows}
        searchable
        onSearchChange={onSearchChange}
        pagination={false}
      />,
    );
    const searchInput = screen.getByPlaceholderText(
      "Search...",
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "ali" } });
    expect(onSearchChange).toHaveBeenCalledWith("ali");
  });

  it("matches snapshot with 3 rows + 2 columns", () => {
    const columns: DataTableColumn<Row>[] = [
      { field: "name", headerName: "Name" },
      { field: "role", headerName: "Role" },
    ];
    const { container } = render(
      <DataTable columns={columns} data={rows} pagination={false} />,
    );
    expect(container).toMatchSnapshot();
  });
});

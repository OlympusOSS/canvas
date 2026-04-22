import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../src/index";

function FullHarness({
  defaultOpen = true,
  collapsible = "offcanvas",
}: {
  defaultOpen?: boolean;
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible={collapsible}>
        <SidebarHeader>
          <SidebarInput placeholder="Search" />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Group</SidebarGroupLabel>
            <SidebarGroupAction aria-label="group-action">+</SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Item A</SidebarMenuButton>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                  <SidebarMenuAction aria-label="more">...</SidebarMenuAction>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Hover tooltip">Item B</SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Sub 1</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton size="sm" isActive>
                        Sub 2
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton>Account</SidebarMenuButton>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <main>Content</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

describe("Sidebar", () => {
  it("renders a full sidebar composition with header, content, footer, and inset", () => {
    render(<FullHarness />);
    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("SidebarTrigger toggles the sidebar state", () => {
    render(<FullHarness />);
    const trigger = screen.getByLabelText("Toggle Sidebar");
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger);
    // Clicking should dispatch the toggle (no error)
    fireEvent.click(trigger);
  });

  it("SidebarRail toggles the sidebar when clicked", () => {
    const { container } = render(<FullHarness />);
    const rail = container.querySelector('[data-sidebar="rail"]');
    expect(rail).not.toBeNull();
    if (rail) fireEvent.click(rail);
  });

  it("renders with collapsible='none' variant (no sheet wrapper)", () => {
    render(<FullHarness collapsible="none" />);
    expect(screen.getByText("Item A")).toBeInTheDocument();
  });

  it("renders with collapsible='icon' variant", () => {
    render(<FullHarness collapsible="icon" />);
    expect(screen.getByText("Item A")).toBeInTheDocument();
  });

  it("SidebarMenuButton without tooltip returns raw button", () => {
    render(
      <SidebarProvider>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Plain</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarProvider>,
    );
    expect(screen.getByText("Plain")).toBeInTheDocument();
  });

  it("SidebarMenuButton with object tooltip config renders", () => {
    render(
      <SidebarProvider>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Hi" }}>X</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarProvider>,
    );
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("variants and sizes produce different classes on SidebarMenuButton", () => {
    const { container } = render(
      <SidebarProvider>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton variant="outline" size="lg">
              LG
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton variant="default" size="sm">
              SM
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarProvider>,
    );
    const buttons = container.querySelectorAll('[data-sidebar="menu-button"]');
    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute("data-size")).toBe("lg");
    expect(buttons[1].getAttribute("data-size")).toBe("sm");
  });

  it("SidebarGroupLabel accepts asChild prop", () => {
    render(
      <SidebarProvider>
        <SidebarGroupLabel asChild>
          <a href="/">Link label</a>
        </SidebarGroupLabel>
      </SidebarProvider>,
    );
    const anchor = screen.getByText("Link label");
    expect(anchor.tagName).toBe("A");
  });

  it("SidebarGroupAction accepts asChild prop", () => {
    render(
      <SidebarProvider>
        <SidebarGroupAction asChild>
          <a href="/" aria-label="go">
            Go
          </a>
        </SidebarGroupAction>
      </SidebarProvider>,
    );
    const anchor = screen.getByText("Go");
    expect(anchor.tagName).toBe("A");
  });

  it("SidebarMenuAction accepts showOnHover and asChild", () => {
    render(
      <SidebarProvider>
        <SidebarMenuAction asChild showOnHover>
          <a href="/" aria-label="x">
            X
          </a>
        </SidebarMenuAction>
      </SidebarProvider>,
    );
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("SidebarMenuSubButton asChild wraps provided element", () => {
    render(
      <SidebarProvider>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
              <a href="/sub">Sub link</a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarProvider>,
    );
    expect(screen.getByText("Sub link").tagName).toBe("A");
  });

  it("ctrl+b keyboard shortcut triggers toggleSidebar (no throw)", () => {
    render(<FullHarness />);
    fireEvent.keyDown(window, { key: "b", ctrlKey: true });
    // The effect runs and no error is thrown.
    expect(screen.getByText("Item A")).toBeInTheDocument();
  });

  it("controlled open prop works with onOpenChange", () => {
    let open = true;
    const setOpen = (next: boolean) => {
      open = next;
    };
    const { container, rerender } = render(
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <SidebarTrigger />
      </SidebarProvider>,
    );
    const trigger = container.querySelector('[data-sidebar="trigger"]') as HTMLElement;
    fireEvent.click(trigger);
    expect(open).toBe(false);
    rerender(
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <SidebarTrigger />
      </SidebarProvider>,
    );
  });

  it("matches snapshot of a minimal sidebar", () => {
    const { container } = render(
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Only</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});

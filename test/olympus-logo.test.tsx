import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OlympusLogo } from "../src/index";

describe("OlympusLogo", () => {
  describe("icon variant (default)", () => {
    it("renders a 24x24 svg with an ellipse", () => {
      const { container } = render(<OlympusLogo />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
      expect(svg?.querySelector("ellipse")).toBeInTheDocument();
    });

    it("respects custom size prop", () => {
      const { container } = render(<OlympusLogo size={48} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "48");
      expect(svg).toHaveAttribute("height", "48");
    });

    it("renders 'lympus' text when showText is true", () => {
      render(<OlympusLogo showText />);
      expect(screen.getByText("lympus")).toBeInTheDocument();
    });

    it("does not render text by default", () => {
      render(<OlympusLogo />);
      expect(screen.queryByText("lympus")).not.toBeInTheDocument();
    });
  });

  describe("ring variant", () => {
    it("renders a 440x736 svg with gradient + path", () => {
      const { container } = render(<OlympusLogo variant="ring" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 440 736");
      expect(svg?.querySelector("linearGradient")).toBeInTheDocument();
      expect(svg?.querySelector("path")).toBeInTheDocument();
    });

    it("ignores showText when variant is ring", () => {
      render(<OlympusLogo variant="ring" showText />);
      // Ring variant does not respect showText
      expect(screen.queryByText("lympus")).not.toBeInTheDocument();
    });

    it("applies className to the svg", () => {
      const { container } = render(
        <OlympusLogo variant="ring" className="h-10 w-10" />,
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-10");
      expect(svg).toHaveClass("w-10");
    });
  });

  it("matches snapshot (icon variant with showText)", () => {
    const { container } = render(<OlympusLogo showText />);
    expect(container).toMatchSnapshot();
  });
});

import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagButton } from "./TagButton";

describe("TagButton", () => {
  it("muestra la etiqueta y dispara onClick al hacer click", () => {
    const onClick = vi.fn();
    render(<TagButton label="javascript" onClick={onClick} />);

    fireEvent.click(screen.getByText("javascript"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

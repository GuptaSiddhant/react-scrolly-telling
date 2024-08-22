import { expect, describe, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useWindowDimension from "./window-dimension.js";

describe("useParentDimension", () => {
  it("should return initial value when disabled is true", () => {
    window.innerHeight = 800;
    window.innerWidth = 1000;

    const { result } = renderHook(() => useWindowDimension({ disabled: true }));

    expect(result.current.windowHeight).toBe(800);
    expect(result.current.windowWidth).toBe(1000);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });

    // Does not update since it is disabled
    expect(result.current.windowWidth).toBe(1000);
  });

  it("should return default value when default is provided", () => {
    window.innerHeight = 800;
    window.innerWidth = 1000;

    const { result } = renderHook(() => useWindowDimension());

    expect(result.current.windowHeight).toBe(800);
    expect(result.current.windowWidth).toBe(1000);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });

    // Updates
    expect(result.current.windowWidth).toBe(800);
  });
});

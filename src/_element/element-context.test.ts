import { expect, describe, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { createElement } from "react";
import { ScrollyProvider } from "../_root/index.js";
import ScrollyElement, { useScrollyElementContext } from "./index.js";
import catchHookErrorMessage from "../__mocks__/catch-hook-error.js";
import { mockIntersectionObserver } from "../__mocks__/intersection-observer-mock.js";

mockIntersectionObserver();

describe("useScrollyElementContext", () => {
  it("throws an error when used outside of a ScrollyElement", () => {
    const error = catchHookErrorMessage(() => useScrollyElementContext());

    expect(error).toEqual(
      "useScrollyContext must be used within a ScrollyElement"
    );
  });

  it("returns value when used inside of a ScrollyElement", () => {
    const { result } = renderHook(() => useScrollyElementContext(), {
      wrapper: ({ children }) =>
        createElement(
          ScrollyProvider,
          null,
          createElement(ScrollyElement, null, children)
        ),
    });

    expect(result.current).toMatchInlineSnapshot(`
      {
        "entryRatio": 1,
        "exitRatio": 1,
        "isVisible": false,
        "scrollDistance": 0,
        "scrollRatio": 0,
        "windowHeight": 770,
        "windowWidth": 1020,
      }
    `);
  });
});

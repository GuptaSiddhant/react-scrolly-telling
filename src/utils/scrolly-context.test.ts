import { renderHook } from "@testing-library/react";
import {
  useScrollyElementContext,
  useScrollyRootContext,
} from "./scrolly-context.js";
import ScrollyProvider from "../provider.js";
import ScrollyElement from "../element.js";
import { createElement } from "react";

vi.spyOn(console, "error").mockImplementation(() => {});
beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("useScrollyRootContext", () => {
  it("throws an error when used outside of a ScrollyProvider", () => {
    expect(() =>
      renderHook(() => useScrollyRootContext())
    ).toThrowErrorMatchingInlineSnapshot(
      '"useScrollyRootContext must be used within a ScrollyProvider"'
    );
  });

  it("returns value when used inside of a ScrollyProvider", () => {
    const { result } = renderHook(() => useScrollyRootContext(), {
      wrapper: ScrollyProvider,
    });

    expect(result.current).toMatchInlineSnapshot(`
      {
        "observeElementIntersection": [Function],
        "windowHeight": 770,
        "windowWidth": 1020,
      }
    `);
  });
});

describe("useScrollyElementContext", () => {
  it("throws an error when used outside of a ScrollyElement", () => {
    expect(() =>
      renderHook(() => useScrollyElementContext())
    ).toThrowErrorMatchingInlineSnapshot(
      '"useScrollyContext must be used within a ScrollyElement"'
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
        "scrollRatio": 0,
        "windowHeight": 770,
        "windowWidth": 1020,
      }
    `);
  });
});

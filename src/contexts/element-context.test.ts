import { renderHook } from "@testing-library/react";
import { createElement } from "react";

import { useScrollyElementContext } from "../utils/scrolly-context.js";
import ScrollyProvider from "../components/Provider.js";
import ScrollyElement from "../element.js";

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
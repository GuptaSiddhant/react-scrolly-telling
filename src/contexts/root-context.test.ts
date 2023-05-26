import { renderHook } from "@testing-library/react";

import ScrollyProvider from "../components/Provider.js";
import useScrollyRootContext from "./root-context.js";

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

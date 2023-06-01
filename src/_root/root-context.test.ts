import { renderHook } from "@testing-library/react";

import { ScrollyProvider } from "./Provider.js";
import { useScrollyRootContext } from "./root-context.js";

import catchHookErrorMessage from "../__mocks__/catch-hook-error.js";
import { mockIntersectionObserver } from "../__mocks__/intersection-observer-mock.js";

mockIntersectionObserver();

describe("useScrollyRootContext", () => {
  it("throws an error when used outside of a ScrollyProvider", () => {
    const error = catchHookErrorMessage(() => useScrollyRootContext());

    expect(error).toEqual(
      "useScrollyRootContext must be used within a ScrollyProvider"
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

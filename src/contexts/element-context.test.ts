import { renderHook } from "@testing-library/react";
import { createElement } from "react";

import ScrollyProvider from "../components/Provider.js";
import ScrollyElement from "../element.js";
import useScrollyElementContext from "./element-context.js";

import catchHookErrorMessage from "../mocks/catch-hook-error.js";
import { mockIntersectionObserver } from "../mocks/intersection-observer-mock.js";

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

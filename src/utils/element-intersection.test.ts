import { renderHook } from "@testing-library/react";
import useElementIntersection from "./element-intersection.js";

import { mockIntersectionObserver } from "../__mocks__/intersection-observer-mock.js";

const { observeSpy, unobserveSpy } = mockIntersectionObserver();

describe("useElementIntersection", () => {
  test("target is observed", () => {
    const { result } = renderHook(() => useElementIntersection());
    const subscribe = result.current;

    const target = document.createElement("div");
    const unsubscribe = subscribe(target, vi.fn());

    expect(observeSpy).toHaveBeenCalledWith(target);

    unsubscribe();
    expect(unobserveSpy).toHaveBeenCalledWith(target);
  });

  test("callback is called on intersection", () => {
    const { result } = renderHook(() => useElementIntersection());
    const subscribe = result.current;

    const target = document.createElement("div");
    const callback = vi.fn();
    subscribe(target, callback);

    expect(callback).not.toHaveBeenCalled();

    // Todo: figure out how to mock IntersectionObserverEntry
    // expect(callback).toHaveBeenCalled();
    // Maybe try `jsdom-testing-mocks`
  });
});

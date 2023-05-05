import { renderHook } from "@testing-library/react";
import useElementIntersection from "./element-intersection.js";

// IntersectionObserver isn't available in test environment
const observeFn = vi.fn();
const unobserveFn = vi.fn();
window.IntersectionObserver = vi.fn().mockReturnValue({
  observe: observeFn,
  unobserve: unobserveFn,
  disconnect: () => null,
});

describe("useElementIntersection", () => {
  test("target is observed", () => {
    const { result } = renderHook(() => useElementIntersection());
    const subscribe = result.current;

    const target = document.createElement("div");
    const unsubscribe = subscribe(target, vi.fn());

    expect(observeFn).toHaveBeenCalledWith(target);

    unsubscribe();
    expect(unobserveFn).toHaveBeenCalledWith(target);
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
  });
});

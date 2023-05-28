/* eslint-disable @typescript-eslint/ban-ts-comment */

import { renderHook } from "@testing-library/react";

import {
  useHorizontalElementLayoutEffect,
  useHorizontalElementScrollDistance,
} from "./horizontal-element.js";

const WINDOW_WIDTH = 1200;
const WINDOW_HEIGHT = 800;

beforeEach(() => {
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

describe("useHorizontalElementScrollDistance", () => {
  window.innerWidth = WINDOW_WIDTH;
  window.innerHeight = WINDOW_HEIGHT;

  it("should return 0 when element is not provided", () => {
    const { result } = renderHook(() =>
      useHorizontalElementScrollDistance(
        // @ts-expect-error
        undefined,
        undefined,
        WINDOW_HEIGHT,
        WINDOW_WIDTH
      )
    );

    expect(result.current).toBe(0);
  });

  it("should return distance when element is provided", () => {
    const containerRef = {
      current: document.createElement("div"),
    };
    const contentRef = {
      current: { scrollWidth: WINDOW_WIDTH * 2 } as HTMLDivElement,
    };

    const { result } = renderHook(() =>
      useHorizontalElementScrollDistance(
        containerRef,
        contentRef,
        WINDOW_HEIGHT,
        WINDOW_WIDTH
      )
    );

    const scrollDistance = result.current;
    expect(scrollDistance).toBe(WINDOW_WIDTH);

    const containerHeight =
      containerRef.current.style.getPropertyValue("height");

    expect(containerHeight).toBe(`${WINDOW_HEIGHT + scrollDistance}px`);
  });
});

describe("useHorizontalElementLayoutEffect", () => {
  it("animate", () => {
    const animateElement = vi.fn();

    const element = document.createElement("div");
    element.animate = animateElement;
    const contentRef = { current: element };
    const scrollDistance = 1000;

    const { rerender } = renderHook(
      ({ scrollRatio }: { scrollRatio: number }) =>
        useHorizontalElementLayoutEffect(
          contentRef,
          scrollRatio,
          scrollDistance
        ),
      { initialProps: { scrollRatio: 0 } }
    );

    const animateOptions = {
      fill: "forwards",
      easing: "ease-in-out",
      duration: 100,
      playbackRate: 1,
    };

    expect(animateElement).toBeCalledTimes(1);
    expect(animateElement).toBeCalledWith(
      { transform: `translateX(-0px)` },
      animateOptions
    );

    rerender({ scrollRatio: 0.5 });
    expect(animateElement).toBeCalledTimes(2);
    expect(animateElement).toBeCalledWith(
      { transform: `translateX(-${scrollDistance * 0.5}px)` },
      animateOptions
    );

    rerender({ scrollRatio: 1 });
    expect(animateElement).toBeCalledTimes(3);
    expect(animateElement).toBeCalledWith(
      { transform: `translateX(-${scrollDistance}px)` },
      animateOptions
    );
  });
});

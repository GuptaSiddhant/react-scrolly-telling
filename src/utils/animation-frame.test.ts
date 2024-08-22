import { vi, expect, beforeEach, describe, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useAnimationFrame from "./animation-frame.js";

vi.useFakeTimers();

const requestAnimationFrameSpy = vi.spyOn(window, "requestAnimationFrame");
const cancelAnimationFrameSpy = vi.spyOn(window, "cancelAnimationFrame");

beforeEach(() => {
  vi.resetAllMocks();

  let timeout: number;

  requestAnimationFrameSpy.mockImplementation((callback) => {
    timeout = setTimeout(callback, 0);
    return 0;
  });

  cancelAnimationFrameSpy.mockImplementation(() => {
    clearTimeout(timeout);
  });
});

describe("useAnimationFrame", () => {
  it("should request new animation frame", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useAnimationFrame(callback));

    expect(requestAnimationFrameSpy).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(0);

    vi.advanceTimersToNextTimer();
    expect(callback).toBeCalledTimes(1);

    unmount();
    expect(cancelAnimationFrameSpy).toBeCalledTimes(1);
  });

  it("should cancel animation frame request if unmounted", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useAnimationFrame(callback));

    expect(requestAnimationFrameSpy).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(0);

    unmount();
    expect(cancelAnimationFrameSpy).toBeCalledTimes(1);

    vi.advanceTimersToNextTimer();
    // RequestAnimationFrame callback should not be called.
    expect(callback).toBeCalledTimes(0);
  });
});

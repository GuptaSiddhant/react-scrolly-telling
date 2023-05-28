import { renderHook } from "@testing-library/react";

import { useVideoTimeChange } from "./video-time.js";

vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
  cb(0);
  return 0;
});

vi.mock("../contexts/element-context.js", () => ({
  default: () => ({ scrollRatio: 0.5, isVisible: true }),
}));

describe("useVideoTimeChange", () => {
  it("should be a function", () => {
    const VIDEO_DURATION = 10;
    const videoElement = {
      duration: VIDEO_DURATION,
      load: () => {},
    } as HTMLVideoElement;
    const timeChangeSpy = vi.fn();

    renderHook(() =>
      useVideoTimeChange(
        { current: videoElement },
        { onTimeChange: timeChangeSpy }
      )
    );

    expect(timeChangeSpy).toHaveBeenCalledTimes(1);
    expect(timeChangeSpy).toHaveBeenCalledWith({
      currentTime: 5,
      progressRatio: 0.5,
    });

    // @TODO - how to test scroll
  });
});

import { useCallback, useMemo } from "react";

import useAnimationFrame from "../utils/animation-frame.js";
import { interpolate } from "../utils/math.js";
import useClientValue from "../utils/use-client-value.js";
import { useStableLayoutEffect } from "../utils/react-helpers.js";

export function useHorizontalElementScrollDistance(
  containerRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
  windowHeight: number,
  windowWidth: number
) {
  const contentScrollWidth: number = useClientValue(
    () => contentRef?.current?.scrollWidth || 0,
    () => 0
  );

  const scrollDistance: number = useMemo(
    () => Math.max(contentScrollWidth - windowWidth, 0),
    [contentScrollWidth, windowWidth]
  );

  // Make container taller to accommodate scroll distance
  useStableLayoutEffect(() => {
    const containerHeight = windowHeight + scrollDistance;
    containerRef?.current?.style.setProperty("height", `${containerHeight}px`);
  }, [containerRef, scrollDistance, windowHeight]);

  return scrollDistance;
}

export function useHorizontalElementLayoutEffect(
  contentRef: React.RefObject<HTMLDivElement>,
  scrollRatio: number,
  scrollDistance: number
): void {
  const translateValue: string = useMemo(
    () =>
      interpolate(scrollRatio, {
        targetFrom: 0,
        targetTo: scrollDistance,
      }).toFixed(0),
    [scrollDistance, scrollRatio]
  );

  const handleAnimationFrame = useCallback(
    (_time: number, delta: number) =>
      contentRef?.current?.animate(
        { transform: `translateX(-${translateValue}px)` },
        {
          fill: "forwards",
          easing: "ease-in-out",
          duration: 100,
          playbackRate: 1 + delta / 100,
        }
      ),
    [contentRef, translateValue]
  );

  useAnimationFrame(handleAnimationFrame);
}

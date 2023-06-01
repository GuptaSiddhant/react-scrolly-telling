import { useEffect, useMemo, useState } from "react";

import { useScrollyElementContext } from "../_element/index.js";
import { interpolate } from "../utils/math.js";
import useAnimationFrame from "../utils/animation-frame.js";
import { roundToDecimal } from "../utils/math.js";

export type VideoTimeChangeFn = (values: VideoTimeChangeValues) => void;

export type VideoTimeChangeValues = {
  currentTime: number;
  progressRatio: number;
};

export interface UseVideoTimeChangeOptions {
  onTimeChange?: VideoTimeChangeFn;
}

export function useVideoTimeChange(
  videoElementRef: React.RefObject<HTMLVideoElement>,
  options: UseVideoTimeChangeOptions = {}
) {
  const { onTimeChange } = options;

  const { scrollRatio, isVisible } = useScrollyElementContext();

  const currentTime: number = useMemo(
    () =>
      interpolate(scrollRatio, {
        targetFrom: 0,
        targetTo: videoElementRef.current?.duration || 0,
      }),
    [scrollRatio, videoElementRef]
  );

  // Preload the video, otherwise the feature doesn't always work on iOS.
  useEffect(() => {
    if (isVisible) {
      videoElementRef.current?.load();
    }
  }, [isVisible, videoElementRef]);

  useAnimationFrame(() => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = currentTime;
    }
  });

  useEffect(() => {
    onTimeChange?.({
      currentTime: roundToDecimal(currentTime, 2),
      progressRatio: scrollRatio,
    });
  }, [onTimeChange, currentTime, scrollRatio]);

  return videoElementRef;
}

export function useVideoCurrentTime(
  videoRef: React.RefObject<HTMLVideoElement>
) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleTimeUpdate = () => {
      const currentTime = videoElement?.currentTime ?? 0;
      setCurrentTime(roundToDecimal(currentTime, 2));
    };

    videoElement?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  return currentTime;
}

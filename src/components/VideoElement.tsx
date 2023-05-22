import { forwardRef, useEffect, useMemo, useRef } from "react";

import interpolate from "../interpolate.js";
import { type Styles, mergeRefs } from "../utils/react-helpers.js";
import { useScrollyElementContext } from "../utils/scrolly-context.js";
import useAnimationFrame from "../utils/animation-frame.js";
import { roundToDecimal } from "../utils/math.js";

export interface VideoElementProps {
  src: string;
  onTimeChange?: VideoTimeChangeFn;
}

export type VideoTimeChangeFn = (values: VideoTimeChangeValues) => void;

export type VideoTimeChangeValues = {
  currentTime: number;
  progressRatio: number;
};

const styles = {
  video: {
    position: "sticky",
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
} satisfies Styles;

const VideoElement = forwardRef<HTMLVideoElement, VideoElementProps>(
  ({ src, onTimeChange }, forwardedRef): JSX.Element => {
    const videoElementRef = useVideoTimeChange({ onTimeChange });

    return (
      <video
        src={src}
        style={styles.video}
        autoPlay={false}
        muted
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        ref={mergeRefs(forwardedRef, videoElementRef)}
      />
    );
  }
);

export default VideoElement;

function useVideoTimeChange({
  onTimeChange,
}: {
  onTimeChange?: VideoTimeChangeFn;
}) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const { scrollRatio, isVisible } = useScrollyElementContext();

  const currentTime: number = useMemo(
    () =>
      interpolate(scrollRatio, {
        targetFrom: 0,
        targetTo: videoElementRef.current?.duration || 0,
      }),
    [scrollRatio]
  );

  // Preload the video, otherwise the feature doesn't always work on iOS.
  useEffect(() => {
    if (isVisible) {
      videoElementRef.current?.load();
    }
  }, [isVisible]);

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

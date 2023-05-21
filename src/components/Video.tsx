import { forwardRef, useEffect, useMemo, useRef } from "react";

import interpolate from "../interpolate.js";
import { mergeRefs } from "../utils/react-helpers.js";
import { useScrollyElementContext } from "../utils/scrolly-context.js";
import useAnimationFrame from "../utils/animation-frame.js";
import { roundToDecimal } from "../utils/math.js";

export interface VideoProps {
  src: string;
  style: React.CSSProperties;
  onTimeChange?: VideoTimeChangeFn;
}

export type VideoTimeChangeFn = (values: VideoTimeChangeValues) => void;

export type VideoTimeChangeValues = {
  currentTime: number;
  progressRatio: number;
};

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ src, style, onTimeChange }, ref): JSX.Element => {
    const videoElementRef = useVideo({ onTimeChange });

    return (
      <video
        src={src}
        style={style}
        autoPlay={false}
        muted
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        ref={mergeRefs(ref, videoElementRef)}
      />
    );
  }
);

export default Video;

function useVideo({ onTimeChange }: { onTimeChange?: VideoTimeChangeFn }) {
  const { scrollRatio, isVisible } = useScrollyElementContext();
  const videoElementRef = useRef<HTMLVideoElement>(null);

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

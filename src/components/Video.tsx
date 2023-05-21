import { useEffect, useRef } from "react";

import interpolate from "../interpolate.js";
import { type Styles } from "../utils/react-helpers.js";
import { useScrollyElementContext } from "../utils/scrolly-context.js";

const styles = {
  videoWrapper: { position: "absolute", inset: 0, zIndex: 0 },
  video: {
    position: "sticky",
    top: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
  },
} satisfies Styles;

export interface VideoProps {
  src: string;
}

export default function Video({ src }: VideoProps): JSX.Element {
  const videoElementRef = useVideo();

  return (
    <div style={styles.videoWrapper}>
      <video
        src={src}
        style={styles.video}
        autoPlay={false}
        muted
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        ref={videoElementRef}
      />
    </div>
  );
}

function useVideo() {
  const { scrollRatio, isVisible } = useScrollyElementContext();
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // Preload the video, otherwise the feature doesn't always work on iOS.
  useEffect(() => {
    if (isVisible) {
      videoElementRef.current?.load();
    }
  }, [isVisible]);

  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (!videoElement) return () => {};

    const frame = requestAnimationFrame(() => {
      videoElement.currentTime = interpolate(scrollRatio, {
        targetFrom: 0,
        targetTo: videoElement.duration || 0,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollRatio]);

  return videoElementRef;
}

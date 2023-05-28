import { forwardRef, useRef } from "react";

import { type Styles, mergeRefs } from "../utils/react-helpers.js";
import {
  type VideoTimeChangeFn,
  useVideoTimeChange,
} from "../utils/video-time.js";

export interface VideoElementProps {
  src: string;
  onTimeChange?: VideoTimeChangeFn;
}

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
    const videoElementRef = useRef<HTMLVideoElement>(null);
    useVideoTimeChange(videoElementRef, { onTimeChange });

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

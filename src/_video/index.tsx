"use client";

import { useRef } from "react";

import ScrollyElement from "../_element/index.js";
import { mergeRefs, type Styles } from "../utils/react-helpers.js";
import VideoCaptions, {
  type VideoCaptionsProps,
  type ScrollyVideoCaptionsConfig,
} from "./VideoCaptions.js";
import { type VideoTimeChangeFn } from "./video-time.js";
import VideoElement from "./VideoElement.js";

export interface ScrollyVideoProps
  extends React.ComponentPropsWithoutRef<"div"> {
  playFromEntry?: boolean;
  playTillExit?: boolean;
  src: string;
  onVideoTimeChange?: VideoTimeChangeFn;
  videoRef?: React.RefObject<HTMLVideoElement>;
  captions?: VideoCaptionsProps["captions"];
  captionsConfig?: ScrollyVideoCaptionsConfig;
}

const styles = {
  scrollyElement: { minHeight: "110vh" },
  videoWrapper: {
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100vw",
  },
} satisfies Styles;

export default function ScrollyVideo({
  children,
  playFromEntry: startOnEntry,
  playTillExit: stopOnExit,
  src,
  onVideoTimeChange,
  videoRef,
  captions,
  captionsConfig,
  ...rest
}: ScrollyVideoProps): JSX.Element | null {
  const innerVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <ScrollyElement
      style={styles.scrollyElement}
      startAtEntryRatio={startOnEntry ? 0 : 1}
      stopAtExitRatio={stopOnExit ? 1 : 0}
      {...rest}
    >
      <div style={styles.videoWrapper} role="presentation">
        <VideoElement
          src={src}
          onTimeChange={onVideoTimeChange}
          ref={mergeRefs(videoRef, innerVideoRef)}
        />

        {captions && captions.length > 0 ? (
          <VideoCaptions
            captions={captions}
            config={captionsConfig}
            videoRef={innerVideoRef}
          />
        ) : null}
      </div>

      {children}
    </ScrollyElement>
  );
}

export type { VideoTimeChangeFn, VideoTimeChangeValues } from "./video-time.js";
export type {
  ScrollyVideoCaptionPosition,
  ScrollyVideoCaptionProps,
  ScrollyVideoCaptionsConfig,
} from "./VideoCaptions.js";

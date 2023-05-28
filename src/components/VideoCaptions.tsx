import {
  DEFAULT_ANIMATION_DURATION,
  type ScrollyVideoCaptionAnimation,
  type ScrollyVideoCaptionPosition,
  calculateVideoCaptionAnimation,
  calculateVideoCaptionStyle,
} from "../utils/video-captions.js";
import { useVideoCurrentTime } from "../utils/video-time.js";

export interface VideoCaptionsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  captions?: ScrollyVideoCaptionProps[];
  config?: ScrollyVideoCaptionsConfig;
}

export interface ScrollyVideoCaptionsConfig {
  /** @default 5vh */
  verticalPadding?: string | number;
  /** @default 5vw */
  horizontalPadding?: string | number;
  /** Styles applied to all caption containers */
  style?: React.CSSProperties;

  animation?: ScrollyVideoCaptionAnimation;
}

export default function VideoCaptions(
  props: VideoCaptionsProps
): JSX.Element | null {
  const { captions = [], videoRef, config = {} } = props;
  const { horizontalPadding, verticalPadding, style, animation } = config;
  const currentTime = useVideoCurrentTime(videoRef);

  return (
    <ul
      style={{ listStyle: "none", padding: "none" }}
      className="scrolly-video-captions"
      data-current-time={currentTime}
    >
      {captions?.map((caption) => (
        <VideoCaption
          horizontalPadding={horizontalPadding}
          verticalPadding={verticalPadding}
          animation={animation}
          {...caption}
          style={style}
          currentTime={currentTime}
          key={`${caption.fromTimestamp}-${caption.toTimestamp}-${caption.position}`}
        />
      ))}
    </ul>
  );
}

export type { ScrollyVideoCaptionAnimation, ScrollyVideoCaptionPosition };

export interface ScrollyVideoCaptionProps {
  /** Content of the caption. Can be string or a component. */
  children: React.ReactNode;
  /** Show caption at this value in seconds */
  fromTimestamp: number;
  /** Hide caption at this value in seconds */
  toTimestamp: number;
  /** @default "center-center" */
  position?: ScrollyVideoCaptionPosition;
  /** @default 5vh */
  verticalPadding?: string | number;
  /** @default 5vw */
  horizontalPadding?: string | number;

  animation?: ScrollyVideoCaptionAnimation;
}

interface VideoCaptionProps extends ScrollyVideoCaptionProps {
  currentTime: number;
  /** Style of the caption container */
  style?: React.CSSProperties;
}

function VideoCaption(props: VideoCaptionProps): JSX.Element | null {
  const {
    children,
    currentTime = 0,
    fromTimestamp,
    toTimestamp,
    style,
    animation,
    ...options
  } = props;
  const animationDuration =
    animation?.durationInSeconds ?? DEFAULT_ANIMATION_DURATION;

  // Overlap animation by half of the duration
  const isVisible =
    currentTime >= fromTimestamp - animationDuration / 2 &&
    currentTime <= toTimestamp + animationDuration / 2;

  if (!isVisible) return null;

  return (
    <li
      className="scrolly-video-caption"
      data-timestamp-from={fromTimestamp}
      data-timestamp-to={toTimestamp}
      style={{
        ...style,
        ...calculateVideoCaptionStyle(options),
        ...calculateVideoCaptionAnimation(animation, {
          currentTime,
          fromTimestamp,
          toTimestamp,
        }),
      }}
    >
      {children}
    </li>
  );
}

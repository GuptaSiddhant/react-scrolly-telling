import { useEffect, useState } from "react";

import { roundToDecimal } from "../utils/math.js";
import interpolate from "../interpolate.js";

export interface VideoCaptionsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  captions?: Omit<ScrollyVideoCaptionProps, "currentTime">[];
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
          commonStyle={style}
          currentTime={currentTime}
          key={`${caption.fromTimestamp}-${caption.toTimestamp}-${caption.position}`}
        />
      ))}
    </ul>
  );
}

function useVideoCurrentTime(videoRef: React.RefObject<HTMLVideoElement>) {
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

enum CaptionPosition {
  Top = "top",
  Bottom = "bottom",
  Center = "center",
  Left = "left",
  Right = "right",
}

export type ScrollyVideoCaptionPosition = `${
  | CaptionPosition.Top
  | CaptionPosition.Bottom
  | CaptionPosition.Center}-${
  | CaptionPosition.Left
  | CaptionPosition.Center
  | CaptionPosition.Right}`;

export interface ScrollyVideoCaptionAnimation {
  durationInSeconds: number;
  variant: ScrollyVideoCaptionAnimationVariant;
}

export type ScrollyVideoCaptionAnimationVariant = "fade";

export interface ScrollyVideoCaptionProps {
  /** Content of the caption. Can be string or a component. */
  children: React.ReactNode;
  /** Show caption at this value in seconds */
  fromTimestamp: number;
  /** Hide caption at this value in seconds */
  toTimestamp: number;
  /** Style of the caption container */
  style?: React.CSSProperties;
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
  commonStyle?: React.CSSProperties;
}

const DEFAULT_ANIMATION_DURATION = 0.5;
const DEFAULT_ANIMATION_VARIANT: ScrollyVideoCaptionAnimationVariant = "fade";

function VideoCaption(props: VideoCaptionProps): JSX.Element | null {
  const {
    children,
    currentTime = 0,
    fromTimestamp,
    toTimestamp,
    commonStyle,
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
        ...commonStyle,
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

function calculateVideoCaptionAnimation(
  animation: ScrollyVideoCaptionAnimation | undefined,
  options: {
    currentTime: number;
    fromTimestamp: number;
    toTimestamp: number;
  }
): React.CSSProperties | undefined {
  const { currentTime, fromTimestamp, toTimestamp } = options;

  const animationVariant = animation?.variant ?? DEFAULT_ANIMATION_VARIANT;
  const animationDuration =
    animation?.durationInSeconds ?? DEFAULT_ANIMATION_DURATION;

  const fromTimeWithAnimation = fromTimestamp - animationDuration / 2;
  const toTimeWithAnimation = toTimestamp + animationDuration / 2;

  const entryRatio = interpolate(currentTime, {
    sourceFrom: fromTimeWithAnimation,
    sourceTo: fromTimeWithAnimation + animationDuration,
    targetFrom: 0,
    targetTo: 1,
    precision: 2,
  });
  const exitRatio = interpolate(currentTime, {
    sourceFrom: toTimeWithAnimation - animationDuration,
    sourceTo: toTimeWithAnimation,
    targetFrom: 1,
    targetTo: 0,
    precision: 2,
  });

  return animationVariant === "fade"
    ? { opacity: entryRatio === 1 ? exitRatio : entryRatio }
    : undefined;
}

interface CalculateVideoCaptionStyleOptions {
  position?: ScrollyVideoCaptionPosition;
  style?: React.CSSProperties;
  commonStyle?: React.CSSProperties;
  verticalPadding?: string | number;
  horizontalPadding?: string | number;
}

const DEFAULT_POSITION: ScrollyVideoCaptionPosition = `${CaptionPosition.Center}-${CaptionPosition.Center}`;
const DEFAULT_VERTICAL_PADDING = "5vh";
const DEFAULT_HORIZONTAL_PADDING = "5vw";

function calculateVideoCaptionStyle({
  position = DEFAULT_POSITION,
  verticalPadding = DEFAULT_VERTICAL_PADDING,
  horizontalPadding = DEFAULT_HORIZONTAL_PADDING,
}: CalculateVideoCaptionStyleOptions): React.CSSProperties {
  const [verticalPosition, horizontalPosition] = position.split("-");

  const alignItems: React.CSSProperties["alignItems"] =
    verticalPosition === CaptionPosition.Top
      ? "flex-start"
      : verticalPosition === CaptionPosition.Bottom
      ? "flex-end"
      : "center";

  const justifyContent: React.CSSProperties["justifyContent"] =
    horizontalPosition === CaptionPosition.Left
      ? "flex-start"
      : horizontalPosition === CaptionPosition.Right
      ? "flex-end"
      : "center";

  const textAlign: React.CSSProperties["textAlign"] =
    horizontalPosition === CaptionPosition.Left
      ? "left"
      : horizontalPosition === CaptionPosition.Right
      ? "right"
      : "center";

  return {
    boxSizing: "border-box",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    top: verticalPadding,
    bottom: verticalPadding,
    left: horizontalPadding,
    right: horizontalPadding,
    insetBlock: verticalPadding,
    insetInline: horizontalPadding,
    alignItems,
    justifyContent,
    textAlign,
  };
}

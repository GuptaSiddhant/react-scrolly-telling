import { useEffect, useState } from "react";
import { type Styles } from "../utils/react-helpers.js";
import { roundToDecimal } from "../utils/math.js";

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
}

export default function VideoCaptions(
  props: VideoCaptionsProps
): JSX.Element | null {
  const { captions = [], videoRef, config = {} } = props;
  const { horizontalPadding, verticalPadding, style } = config;
  const currentTime = useVideoCurrentTime(videoRef);

  return (
    <>
      {captions?.map((caption, i) => (
        <VideoCaption
          horizontalPadding={horizontalPadding}
          verticalPadding={verticalPadding}
          {...caption}
          commonStyle={style}
          currentTime={currentTime}
          key={i}
        />
      ))}
    </>
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
}

interface VideoCaptionProps extends ScrollyVideoCaptionProps {
  currentTime: number;
  commonStyle?: React.CSSProperties;
}

const styles = {
  caption: {
    boxSizing: "border-box",
    position: "absolute",
    zIndex: 0,
  },
} satisfies Styles;

const DEFAULT_POSITION: ScrollyVideoCaptionPosition = `${CaptionPosition.Center}-${CaptionPosition.Center}`;
const DEFAULT_VERTICAL_PADDING = "5vh";
const DEFAULT_HORIZONTAL_PADDING = "5vw";

function VideoCaption(props: VideoCaptionProps): JSX.Element | null {
  const {
    children,
    currentTime = 0,
    fromTimestamp,
    toTimestamp,
    ...options
  } = props;
  const isVisible = currentTime >= fromTimestamp && currentTime <= toTimestamp;

  if (!isVisible) return null;

  return <div style={calculateVideoCaptionStyle(options)}>{children}</div>;
}

interface CalculateVideoCaptionStyleOptions {
  position?: ScrollyVideoCaptionPosition;
  style?: React.CSSProperties;
  commonStyle?: React.CSSProperties;
  verticalPadding?: string | number;
  horizontalPadding?: string | number;
}

function calculateVideoCaptionStyle({
  commonStyle,
  style,
  position = DEFAULT_POSITION,
  verticalPadding = DEFAULT_VERTICAL_PADDING,
  horizontalPadding = DEFAULT_HORIZONTAL_PADDING,
}: CalculateVideoCaptionStyleOptions): React.CSSProperties {
  const [verticalPosition, horizontalPosition] = position.split("-");

  const verticalStyle: React.CSSProperties =
    verticalPosition === CaptionPosition.Top
      ? { top: verticalPadding, verticalAlign: verticalPosition }
      : verticalPosition === CaptionPosition.Bottom
      ? { bottom: verticalPadding, verticalAlign: verticalPosition }
      : { top: "50%", verticalAlign: "middle" };

  const horizontalStyle: React.CSSProperties =
    horizontalPosition === CaptionPosition.Left
      ? { left: horizontalPadding, textAlign: horizontalPosition }
      : horizontalPosition === CaptionPosition.Right
      ? { right: horizontalPadding, textAlign: horizontalPosition }
      : { left: "50%", textAlign: "center" };

  const transform: string | undefined =
    verticalPosition === CaptionPosition.Center &&
    horizontalPosition === CaptionPosition.Center
      ? "translate(-50%,-50%)"
      : verticalPosition === CaptionPosition.Center
      ? "translateY(-50%)"
      : horizontalPosition === CaptionPosition.Center
      ? "translateX(-50%)"
      : undefined;

  return {
    ...commonStyle,
    ...style,
    ...styles.caption,
    ...verticalStyle,
    ...horizontalStyle,
    transform,
  };
}

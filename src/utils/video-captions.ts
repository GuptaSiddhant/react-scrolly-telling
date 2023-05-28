import interpolate from "../interpolate.js";

// Animation

export interface ScrollyVideoCaptionAnimation {
  durationInSeconds: number;
  variant: ScrollyVideoCaptionAnimationVariant;
}

export type ScrollyVideoCaptionAnimationVariant = "fade";

export const DEFAULT_ANIMATION_DURATION = 0.5;
export const DEFAULT_ANIMATION_VARIANT: ScrollyVideoCaptionAnimationVariant =
  "fade";

export function calculateVideoCaptionAnimation(
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

// Positioning

const enum CaptionPosition {
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

export interface CalculateVideoCaptionStyleOptions {
  position?: ScrollyVideoCaptionPosition;
  verticalPadding?: string | number;
  horizontalPadding?: string | number;
}

const DEFAULT_POSITION: ScrollyVideoCaptionPosition = `${CaptionPosition.Center}-${CaptionPosition.Center}`;
const DEFAULT_VERTICAL_PADDING = "5vh";
const DEFAULT_HORIZONTAL_PADDING = "5vw";

export function calculateVideoCaptionStyle({
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
    alignItems,
    justifyContent,
    textAlign,
  };
}

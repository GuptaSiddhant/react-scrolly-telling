import { minmax, roundToDecimal } from "./utils/math";
import useWindowDimensions from "./utils/window-resize";
import useElementPosition from "./utils/window-scroll";

const DEFAULT_START_AT = 1;
const DEFAULT_END_AT = 1;
const DEFAULT_PRECISION = 2;
const DEFAULT_DISABLED = false;

export interface ScrollyOptions {
  /**  Disable the scrolly effect. Always returns 0 as scroll ratio value. */
  disabled?: boolean;
  /**
   * Value: 0 - 1 (default: 1)
   * 0: start counting when the container enters the viewport.
   * 0.5: start counting when the top of the container is at the middle of the viewport.
   * 1: start counting when top of container is at the top of the viewport.
   */
  startAt?: number;
  /**
   * Value: 0 - 1 (default: 1)
   * 0: stop counting when the container leaves the viewport
   * 0.5: stop counting when the bottom of the container is at the middle of the viewport.
   * 1: stop counting when the bottom of the container is at the bottom of the viewport.
   */
  endAt?: number;
  /**
   * The number of decimal places (1-5) to round to for returned values. Default: 2.
   *
   * Warning: Increasing the precision will cause the calculations depending
   * scroll ratio to be recalculated more often by a multiple of 10.
   */
  precision?: number;
}

export interface ScrollyValues {
  /** The ratio of container's scroll that has taken place. The numeric value ranges from 0 to 1. */
  readonly scrollRatio: number;
  /** The ratio of container's entry in the viewport. The number value ranges from 0 to 1. */
  readonly entryRatio: number;
  /** The ratio of container's exit from the viewport. The number value ranges from 0 to 1. */
  readonly exitRatio: number;
  /** Current height of window/viewport in px. */
  readonly windowHeight: number;
  /** Current width of window/viewport in px. */
  readonly windowWidth: number;
}

/**
 * Hook to create a scrolly-telling effect.
 * @returns The ref to the container element and the current scroll ratio.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLElement>(null);
 * const { scrollRatio } = useScrolly(ref);
 *
 * useEffect(() => {
 *   // do something with scrollRatio
 * }, [scrollRatio])
 *
 * return <section ref={ref}>{children}</section>;
 * ```
 */
export default function useScrolly<E extends HTMLElement = HTMLElement>(
  ref: React.RefObject<E>,
  options?: ScrollyOptions
): ScrollyValues {
  const {
    startAt = DEFAULT_START_AT,
    endAt = DEFAULT_END_AT,
    disabled = DEFAULT_DISABLED,
    precision = DEFAULT_PRECISION,
  } = options || {};
  const decimalPlaces = minmax(precision, 1, 6);

  const { windowHeight, windowWidth } = useWindowDimensions({ disabled });
  const containerTop = useElementPosition(ref, "top", { disabled });
  const containerHeight = useElementPosition(ref, "height", { disabled });

  const scrollRatio: number = calculateScrollRatio(
    windowHeight,
    startAt,
    endAt,
    containerTop,
    containerHeight,
    decimalPlaces,
    disabled
  );

  const entryRatio: number = calculateEntryRatio(
    containerTop,
    windowHeight,
    decimalPlaces
  );

  const exitRatio: number = calculateExitRatio(
    containerTop + containerHeight,
    windowHeight,
    decimalPlaces
  );

  return {
    entryRatio,
    exitRatio,
    scrollRatio,
    windowHeight,
    windowWidth,
  } as const;
}

/**
 * The ratio of container's scroll that has taken place. Value: 0 - 1
 * - 0.0: the content is 0% scrolled.
 * - 0.5: the content is 50% scrolled.
 * - 1.0: the content is 100% scrolled.
 */
function calculateScrollRatio<E extends HTMLElement>(
  windowHeight: number,
  startAt: number,
  endAt: number,
  containerTop: number,
  containerHeight: number,
  decimalPlaces: number,
  disabled: boolean
) {
  if (disabled || containerHeight <= 0) return 0;

  /**
   * If the container is smaller than the window,
   * we want to start on entry and end on exit.
   */
  const isSmallerThanWindow = containerHeight <= windowHeight;
  const normalisedStartAt = isSmallerThanWindow ? 0 : startAt;

  const ratio =
    (windowHeight * (1 - normalisedStartAt) - containerTop) /
    (containerHeight + windowHeight * (1 - endAt - normalisedStartAt));

  return roundToDecimal(minmax(ratio, 0, 1), decimalPlaces);
}

/**
 * The ratio of entry in viewport. Value: 0 - 1
 * - 0.0: the container has not entered the viewport.
 * - 0.5: the top of the container is halfway into the viewport.
 * - 1.0: the top of the container has reached top of the viewport.
 */
function calculateEntryRatio(
  containerTop: number,
  windowHeight: number,
  decimalPlaces: number
) {
  const distanceRatio = roundToDecimal(
    containerTop / windowHeight,
    decimalPlaces
  );

  return minmax(1 - distanceRatio, 0, 1);
}

/**
 * The ratio of exit from viewport. Value: 0 - 1
 * - 0.0: the bottom of the container is at the bottom of the viewport.
 * - 0.5: the bottom of the container is halfway into the viewport.
 * - 1.0: the container has completely exited the viewport.
 */
function calculateExitRatio(
  containerBottom: number,
  windowHeight: number,
  decimalPlaces: number
) {
  const distanceRatio = roundToDecimal(
    containerBottom / windowHeight,
    decimalPlaces
  );

  return minmax(1 - distanceRatio, 0, 1);
}

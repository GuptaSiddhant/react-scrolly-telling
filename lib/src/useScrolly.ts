import { minmax, roundToDecimal } from "./utils/math.js";
import useParentElementDimension from "./utils/parent-dimension.js";
import useElementPosition from "./utils/element-position.js";

const DEFAULT_START_AT = 1;
const DEFAULT_END_AT = 1;
const DEFAULT_PRECISION = 2;
const DEFAULT_DISABLED = false;

export interface ScrollyOptions {
  /**  Disable the scrolly effect. Always returns 0 as scroll ratio value. */
  disabled?: boolean;
  /**
   * Value: 0 - 1 (default: 1)
   * 0: start counting when the element enters the viewport.
   * 0.5: start counting when the top of the element is at the middle of the viewport.
   * 1: start counting when top of element is at the top of the viewport.
   */
  startAt?: number;
  /**
   * Value: 0 - 1 (default: 1)
   * 0: stop counting when the element leaves the viewport
   * 0.5: stop counting when the bottom of the element is at the middle of the viewport.
   * 1: stop counting when the bottom of the element is at the bottom of the viewport.
   */
  endAt?: number;
  /**
   * The number of decimal places (1-5) to round to for returned values. Default: 2.
   *
   * Warning: Increasing the precision will cause the calculations depending
   * scroll ratio to be recalculated more often by a multiple of 10.
   */
  precision?: number;
  /**
   * The parent element to use for calculating the scroll ratio. Defaults to 'window'.
   */
  parentElement?: HTMLElement;
}

export interface ScrollyValues {
  /** The ratio of element's scroll that has taken place. The numeric value ranges from 0 to 1. */
  readonly scrollRatio: number;
  /** The ratio of element's entry in the viewport. The number value ranges from 0 to 1. */
  readonly entryRatio: number;
  /** The ratio of element's exit from the viewport. The number value ranges from 0 to 1. */
  readonly exitRatio: number;
  /** Current height of window/viewport in px. */
  readonly windowHeight: number;
  /** Current width of window/viewport in px. */
  readonly windowWidth: number;
}

/**
 * Hook to create a scrolly-telling effect.
 * @returns The ref to the element element and the current scroll ratio.
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
    parentElement,
  } = options || {};
  const decimalPlaces = minmax(precision, 1, 6);

  const { windowHeight, windowWidth } = useParentElementDimension({ disabled });
  const { top: elementTop, height: elementHeight } = useElementPosition(ref, {
    disabled,
    parentElement,
  });

  const scrollRatio: number = calculateScrollRatio(
    windowHeight,
    startAt,
    endAt,
    elementTop,
    elementHeight,
    decimalPlaces,
    disabled
  );

  const entryRatio: number = calculateEntryRatio(
    elementTop,
    windowHeight,
    decimalPlaces
  );

  const exitRatio: number = calculateExitRatio(
    elementTop + elementHeight,
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
 * The ratio of element's scroll that has taken place. Value: 0 - 1
 * - 0.0: the content is 0% scrolled.
 * - 0.5: the content is 50% scrolled.
 * - 1.0: the content is 100% scrolled.
 */
function calculateScrollRatio(
  windowHeight: number,
  startAt: number,
  endAt: number,
  elementTop: number,
  elementHeight: number,
  decimalPlaces: number,
  disabled: boolean
) {
  if (disabled || elementHeight <= 0) return 0;

  /**
   * If the element is smaller than the window,
   * we want to start on entry and end on exit.
   */
  const isSmallerThanWindow = elementHeight <= windowHeight;
  const normalisedStartAt = isSmallerThanWindow ? 0 : startAt;

  const ratio =
    (windowHeight * (1 - normalisedStartAt) - elementTop) /
    (elementHeight + windowHeight * (1 - endAt - normalisedStartAt));

  return roundToDecimal(minmax(ratio, 0, 1), decimalPlaces);
}

/**
 * The ratio of entry in viewport. Value: 0 - 1
 * - 0.0: the element has not entered the viewport.
 * - 0.5: the top of the element is halfway into the viewport.
 * - 1.0: the top of the element has reached top of the viewport.
 */
function calculateEntryRatio(
  elementTop: number,
  windowHeight: number,
  decimalPlaces: number
) {
  const distanceRatio = elementTop / windowHeight;
  return minmax(roundToDecimal(1 - distanceRatio, decimalPlaces), 0, 1);
}

/**
 * The ratio of exit from viewport. Value: 0 - 1
 * - 0.0: the bottom of the element is at the bottom of the viewport.
 * - 0.5: the bottom of the element is halfway into the viewport.
 * - 1.0: the element has completely exited the viewport.
 */
function calculateExitRatio(
  elementBottom: number,
  windowHeight: number,
  decimalPlaces: number
) {
  const distanceRatio = elementBottom / windowHeight;
  return minmax(roundToDecimal(1 - distanceRatio, decimalPlaces), 0, 1);
}

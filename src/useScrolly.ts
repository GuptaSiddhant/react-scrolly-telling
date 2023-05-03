import { minmax, roundToDecimal } from "./utils/math.js";
import useElementPosition from "./utils/element-position.js";
import useScrollyContext from "./utils/scrolly-context.js";
import useElementVisible from "./utils/element-visible.js";

const DEFAULT_START_AT = 1;
const DEFAULT_END_AT = 0;
const DEFAULT_PRECISION = 2;

export interface ScrollyOptions {
  /**  Disable the scrolly effect. Always returns 0 as scroll ratio value. */
  disabled?: boolean;
  /**
   * Value: 0 - 1 (default: 1)
   * 0: start counting when the element enters the viewport (entryRatio = 0).
   * 0.5: start counting when the top of the element is at the middle of the viewport (entryRatio = 0.5).
   * 1: start counting when top of element is at the top of the viewport (entryRatio = 1).
   */
  startAtEntryRatio?: number;
  /**
   * Value: 0 - 1 (default: 0)
   * 0: stop counting when the bottom of the element is at the bottom of the viewport (exitRatio = 0).
   * 0.5: stop counting when the bottom of the element is at the middle of the viewport (exitRatio = 0.5).
   * 1: stop counting when the element leaves the viewport (exitRatio = 1).
   */
  stopAtExitRatio?: number;
  /**
   * The number of decimal places (1-5) to round to for returned values. Default: 2.
   *
   * Warning: Increasing the precision will cause the calculations depending
   * scroll ratio to be recalculated more often by a multiple of 10.
   */
  precision?: number;
}

export interface ScrollyValues {
  /** The ratio of element's scroll that has taken place. The numeric value ranges from 0 to 1. */
  readonly scrollRatio: number;
  /** The ratio of element's entry in the viewport. The number value ranges from 0 to 1. */
  readonly entryRatio: number;
  /** The ratio of element's exit from the viewport. The number value ranges from 0 to 1. */
  readonly exitRatio: number;
  /** The visibility of element in the viewport. True when a portion of element is in the viewport. */
  readonly isVisible: boolean;
}

/**
 * Hook to create a scrolly-telling effect.
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
  const { startAtEntryRatio, stopAtExitRatio, precision, disabled } =
    options || {};
  const decimalPlaces = minmax(precision ?? DEFAULT_PRECISION, 1, 6);

  const isVisible = useElementVisible(ref);
  const { windowHeight } = useScrollyContext();
  const { top: elementTop, height: elementHeight } = useElementPosition(ref, {
    disabled: disabled ?? !isVisible,
  });

  const scrollRatio: number = calculateScrollRatio(
    windowHeight,
    startAtEntryRatio ?? DEFAULT_START_AT,
    stopAtExitRatio ?? DEFAULT_END_AT,
    elementTop,
    elementHeight,
    decimalPlaces
  );

  const entryRatio: number = calculateEntryExitRatio(
    elementTop,
    windowHeight,
    decimalPlaces
  );

  const exitRatio: number = calculateEntryExitRatio(
    elementTop + elementHeight,
    windowHeight,
    decimalPlaces
  );

  return {
    entryRatio,
    exitRatio,
    scrollRatio,
    isVisible,
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
  stopAt: number,
  elementTop: number,
  elementHeight: number,
  decimalPlaces: number
) {
  if (elementHeight <= 0) return 0;

  /**
   * If the element is smaller than the window,
   * we want to start on entry and end on exit.
   */
  const isSmallerThanWindow = elementHeight <= windowHeight;
  const normalisedStartAt = isSmallerThanWindow ? 0 : startAt;

  const ratio =
    (windowHeight * (1 - normalisedStartAt) - elementTop) /
    (elementHeight + windowHeight * (stopAt - normalisedStartAt));

  return roundToDecimal(minmax(ratio, 0, 1), decimalPlaces);
}

/**
 * The ratio of entry in viewport. Value: 0 - 1
 * - 0.0: the element' part has not entered the viewport.
 * - 0.5: the part of the element is halfway into the viewport.
 * - 1.0: the part of the element has reached top of the viewport.
 */
function calculateEntryExitRatio(
  elementPosition: number,
  windowHeight: number,
  decimalPlaces: number
) {
  const distanceRatio = elementPosition / windowHeight;
  return minmax(roundToDecimal(1 - distanceRatio, decimalPlaces), 0, 1);
}

/** @internal */
export const __EXPORTS_FOR_TESTS_ONLY__ = {
  calculateEntryExitRatio,
  calculateScrollRatio,
};

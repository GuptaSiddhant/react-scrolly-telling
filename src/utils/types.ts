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
  /** Current height of window/viewport in px. */
  readonly windowHeight: number;
  /** Current width of window/viewport in px. */
  readonly windowWidth: number;

  readonly scrollDistance: number;
}

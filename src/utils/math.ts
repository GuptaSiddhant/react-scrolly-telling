import invariant from "./invariant.js";

export function roundToDecimal(num: number, decimalPlaces?: number): number {
  if (decimalPlaces === 0) return Math.round(num);
  const multiplier = 10 ** Math.round(decimalPlaces || 0);
  const roundedValue = Math.round(num * multiplier) / multiplier;

  if (decimalPlaces && decimalPlaces < 0) return Math.round(roundedValue);
  return roundedValue;
}

export function minmax(num: number, min?: number, max?: number): number {
  return Math.max(max !== undefined ? Math.min(num, max) : num, min || 0);
}

export interface InterpolateOptions {
  targetFrom: number;
  targetTo: number;
  sourceFrom?: number;
  sourceTo?: number;
  /**
   * Easing function which allows you to customize the input, for example to apply a certain easing function.
   * By default, the input is left unmodified, resulting in a pure linear interpolation.
   * A list of easing functions used from `Easing` class.
   */
  easing?: EasingFn;
  /** Result will be rounded at provided number of decimal places. */
  precision?: number;
}

export function interpolate(
  input: number,
  options: InterpolateOptions
): number {
  const sourceFrom = options.sourceFrom ?? 0;
  const sourceTo = options.sourceTo ?? 1;
  const easing = options.easing ?? Easing.linear;
  const { targetFrom, targetTo, precision } = options;

  invariant(typeof input === "number", "input must be a number");
  invariant(typeof targetFrom === "number", "targetFrom must be a number");
  invariant(typeof targetTo === "number", "targetTo must be a number");

  if (sourceFrom === sourceTo) return input;
  if (targetFrom === targetTo) return targetFrom;

  let result: number = input;
  if (result < sourceFrom) return targetFrom;
  if (result > sourceTo) return targetTo;

  // Input Range
  result = (result - sourceFrom) / (sourceTo - sourceFrom);
  result = easing(result);
  // Output Range
  result = result * (targetTo - targetFrom) + targetFrom;

  if (precision) return roundToDecimal(result, precision);

  return result;
}

// Easing functions

export type EasingFn = (t: number) => number;

/** The Easing object implements common easing functions. You can use it with the interpolate() API. */
export const Easing = {
  step0: (n) => (n > 0 ? 1 : 0),
  step1: (n) => (n >= 1 ? 1 : 0),
  linear: (n) => n,
  quad: (n) => n * n,
  cubic: (n) => n * n * n,
  sin: (n) => 1 - Math.cos((n * Math.PI) / 2),
  circle: (n) => 1 - Math.sqrt(1 - n * n),
  exp: (n) => 2 ** (10 * (n - 1)),
  bounce: (n) => {
    if (n < 1 / 2.75) return 7.5625 * n * n;
    if (n < 2 / 2.75) {
      const t2_ = n - 1.5 / 2.75;
      return 7.5625 * t2_ * t2_ + 0.75;
    }
    if (n < 2.5 / 2.75) {
      const t2_ = n - 2.25 / 2.75;
      return 7.5625 * t2_ * t2_ + 0.9375;
    }
    const t2 = n - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  },
} satisfies Record<string, EasingFn>;

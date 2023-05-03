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
  targetStart: number;
  targetEnd: number;
  sourceStart?: number;
  sourceEnd?: number;
  method?: "linear";
}

export function interpolate(
  value: number,
  options: InterpolateOptions
): number {
  const {
    sourceStart = 0,
    sourceEnd = 1,
    targetEnd,
    targetStart,
    method = "linear",
  } = options;
  if (sourceStart === sourceEnd) return value;
  if (targetStart === targetEnd) return targetStart;

  if (method === "linear") {
    return interpolateLinear(
      value,
      sourceStart,
      sourceEnd,
      targetStart,
      targetEnd
    );
  }

  return value;
}

function interpolateLinear(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  // Source: https://www.trysmudford.com/blog/linear-interpolation-functions/
  const normalisedValue = minmax((value - x1) / (y1 - x1), 0, 1);
  return x2 * (1 - normalisedValue) + y2 * normalisedValue;
}

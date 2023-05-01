export function roundToDecimal(num: number, decimalPlaces: number = 0): number {
  if (decimalPlaces === 0) return Math.round(num);
  const multiplier = 10 ** Math.round(decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

export function minmax(num: number, min: number = 0, max?: number): number {
  return Math.max(max !== undefined ? Math.min(num, max) : num, min);
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
      [sourceStart, sourceEnd],
      [targetStart, targetEnd]
    );
  }

  return value;
}

function interpolateLinear(
  value: number,
  source: [number, number],
  target: [number, number]
): number {
  const [x1, y1] = source;
  const [x2, y2] = target;
  if (x1 === y1) return value;
  // Source: https://www.trysmudford.com/blog/linear-interpolation-functions/
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  const invlerp = (x: number, y: number, a: number) =>
    minmax((a - x) / (y - x), 0, 1);
  return lerp(x2, y2, invlerp(x1, y1, value));
}

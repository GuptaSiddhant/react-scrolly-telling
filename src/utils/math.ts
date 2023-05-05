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

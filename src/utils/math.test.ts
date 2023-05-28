// @vitest-environment node

import { minmax, roundToDecimal } from "./math.js";

describe.concurrent("minmax", () => {
  it("should clamp a value between a min and max", () => {
    expect(minmax(-1, 1, 5)).toBe(1);
    expect(minmax(3, 1, 5)).toBe(3);
    expect(minmax(10, 1, 5)).toBe(5);
  });

  it("should allow any value greater than min when max is undefined", () => {
    expect(minmax(-1, 1)).toBe(1);
    expect(minmax(10, 1)).toBe(10);
    expect(minmax(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("should not return value less than 0 when min is undefined", () => {
    expect(minmax(-1)).toBe(0);
    expect(minmax(10)).toBe(10);
  });
});

describe.concurrent("roundToDecimal", () => {
  it("should round a number when decimalPlace is undefined", () => {
    expect(roundToDecimal(0.9345)).toBe(1);
    expect(roundToDecimal(1.2655)).toBe(1);
  });

  it("should round a number to a given decimal place", () => {
    expect(roundToDecimal(0.9345, 0)).toBe(1);
    expect(roundToDecimal(1.2655, 0)).toBe(1);
    expect(roundToDecimal(1.2345, 1)).toBe(1.2);
    expect(roundToDecimal(1.2655, 1)).toBe(1.3);
    expect(roundToDecimal(1.2345, 2)).toBe(1.23);
    expect(roundToDecimal(1.2355, 2)).toBe(1.24);
    expect(roundToDecimal(1.2354, 3)).toBe(1.235);
    expect(roundToDecimal(1.2355, 3)).toBe(1.236);
    expect(roundToDecimal(1.2355, 4)).toBe(1.2355);
    expect(roundToDecimal(1.2355, 5)).toBe(1.2355);
  });

  it("should round a number to a given non-decimal place with negative value", () => {
    expect(roundToDecimal(12345.5, -1)).toBe(12350);
    expect(roundToDecimal(12345.5, -2)).toBe(12300);
    expect(roundToDecimal(12345.5, -3)).toBe(12000);
    expect(roundToDecimal(12345.5, -4)).toBe(10000);
    expect(roundToDecimal(12345.5, -5)).toBe(0);
    expect(roundToDecimal(62345.5, -5)).toBe(100000);
  });
});

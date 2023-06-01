// @vitest-environment node

import { minmax, roundToDecimal, interpolate, Easing } from "./math.js";

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

describe.concurrent("interpolate", () => {
  it("should interpolate a value with default source range [0 1]", () => {
    expect(
      interpolate(0.5, {
        targetFrom: 0,
        targetTo: 100,
      })
    ).toBe(50);
  });

  it("should return same value when source start and end are same", () => {
    expect(
      interpolate(0.5, {
        sourceFrom: 2,
        sourceTo: 2,
        targetFrom: 0,
        targetTo: 100,
      })
    ).toBe(0.5);
  });

  it("should return the target-start value when target start and end are same", () => {
    expect(
      interpolate(0.5, {
        targetFrom: 100,
        targetTo: 100,
      })
    ).toBe(100);
  });

  it("should return targetFrom when input is less than sourceFrom", () => {
    expect(
      interpolate(0.5, {
        sourceFrom: 1,
        sourceTo: 2,
        targetFrom: 0,
        targetTo: 100,
      })
    ).toBe(0);
  });

  it("should return targetTo when input is more than sourceTo", () => {
    expect(
      interpolate(2.5, {
        sourceFrom: 1,
        sourceTo: 2,
        targetFrom: 0,
        targetTo: 100,
      })
    ).toBe(100);
  });

  it("should interpolate a value between two ranges", () => {
    expect(
      interpolate(0.5, {
        sourceFrom: 0,
        sourceTo: 1,
        targetFrom: 0,
        targetTo: 100,
      })
    ).toBe(50);
  });

  it("should interpolate a value with ease method", () => {
    expect(
      interpolate(0.5, {
        sourceFrom: 0,
        sourceTo: 1,
        targetFrom: 0,
        targetTo: -1,
        easing: Easing.quad,
        precision: 2,
      })
    ).toBe(-0.25);
  });
});

describe.concurrent("Easing", () => {
  Object.entries(Easing).forEach(([name, fn]) => {
    it(`should return a number for '${name}'`, () => {
      expect(typeof fn(0.5)).toBe("number");
    });
  });
});

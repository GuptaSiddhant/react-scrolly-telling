// @vitest-environment node

/* eslint-disable @typescript-eslint/ban-ts-comment */

import interpolate, { Easing } from "./interpolate.js";

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

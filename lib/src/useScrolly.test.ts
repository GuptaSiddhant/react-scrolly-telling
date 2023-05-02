import { renderHook } from "@testing-library/react";
import useScrolly, { __EXPORTS_FOR_TESTS_ONLY__ } from "./useScrolly.js";

describe("useScrolly", () => {
  it("render hook", () => {
    window.innerHeight = 1000;
    window.innerWidth = 1000;

    const scrollGap = document.createElement("aside");
    scrollGap.style.height = "1000px";
    scrollGap.style.width = "1000px";

    const element = document.createElement("main");
    element.style.height = "2000px";
    element.style.width = "1000px";
    element.innerText = "Hello World";

    document.body.appendChild(scrollGap);
    document.body.appendChild(element);
    document.body.appendChild(scrollGap.cloneNode());

    const ref = { current: element };
    const { result } = renderHook(() => useScrolly(ref));

    expect(result.current.windowHeight).toBe(1000);
    expect(result.current.windowWidth).toBe(1000);
  });
});

const { calculateEntryExitRatio, calculateScrollRatio } =
  __EXPORTS_FOR_TESTS_ONLY__;

describe.concurrent("calculateEntryExitRatio", () => {
  it("should return 0 when element's top is below viewport", () => {
    expect(calculateEntryExitRatio(1500, 1000, 2)).toBe(0);
    expect(calculateEntryExitRatio(1000, 1000, 2)).toBe(0);
  });
  it("should return 0.5 when element's top is half way in the viewport", () => {
    expect(calculateEntryExitRatio(500, 1000, 2)).toBe(0.5);
  });
  it("should return 1 when element's top has reached top of the viewport and beyond", () => {
    expect(calculateEntryExitRatio(0, 1000, 2)).toBe(1);
    expect(calculateEntryExitRatio(-500, 1000, 2)).toBe(1);
  });
});

describe.concurrent("calculateScrollRatio", () => {
  const windowHeight = 1000;
  const decimalPlaces = 2;
  const disabled = false;

  describe.concurrent("when element is bigger than viewport", () => {
    const elementHeight = 2000;

    describe.concurrent("when startAt=1 and endAt=1 (default)", () => {
      const startAt = 1;
      const endAt = 1;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 0],
        [0, 0],
        [-500, 0.5],
        [-1000, 1],
        [-1500, 1],
        [-2000, 1],
        [-2500, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });

    describe.concurrent("when startAt=0 and endAt=1", () => {
      const startAt = 0;
      const endAt = 1;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 0.25],
        [0, 0.5],
        [-500, 0.75],
        [-1000, 1],
        [-1500, 1],
        [-2000, 1],
        [-2500, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });

    describe.concurrent("when startAt=1 and endAt=0", () => {
      const startAt = 1;
      const endAt = 0;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 0],
        [0, 0],
        [-500, 0.25],
        [-1000, 0.5],
        [-1500, 0.75],
        [-2000, 1],
        [-2500, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });

    describe.concurrent("when startAt=0 and endAt=0", () => {
      const startAt = 0;
      const endAt = 0;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 0.17],
        [0, 0.33],
        [-500, 0.5],
        [-1000, 0.67],
        [-1500, 0.83],
        [-2000, 1],
        [-2500, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });
  });

  describe.concurrent("when element is smaller than viewport", () => {
    const elementHeight = 500;

    describe.concurrent("when startAt=1 and endAt=1 (default)", () => {
      const startAt = 1;
      const endAt = 1;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 1],
        [0, 1],
        [-500, 1],
        [-1000, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });

    describe.concurrent("when startAt=0 and endAt=1", () => {
      const startAt = 0;
      const endAt = 1;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 1],
        [0, 1],
        [-500, 1],
        [-1000, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });

    describe.concurrent("when startAt=1 and endAt=0", () => {
      const startAt = 1;
      const endAt = 0;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 0.33],
        [0, 0.67],
        [-500, 1],
        [-1000, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });

    describe.concurrent("when startAt=0 and endAt=0", () => {
      const startAt = 0;
      const endAt = 0;
      const elementTopMap = new Map<number, number>([
        [1500, 0],
        [1000, 0],
        [500, 0.33],
        [0, 0.67],
        [-500, 1],
        [-1000, 1],
      ]);

      for (const [elementTop, scrollRatio] of elementTopMap) {
        it(`element top position: ${elementTop} -> scrollRatio: ${scrollRatio}`, () => {
          expect(
            calculateScrollRatio(
              windowHeight,
              startAt,
              endAt,
              elementTop,
              elementHeight,
              decimalPlaces,
              disabled
            )
          ).toBe(scrollRatio);
        });
      }
    });
  });
});
